import express from "express";
import path from 'path'; // Import the path module
import PDFDocument from "pdfkit";
import fs from "fs";
import Cases from "../model/caseModel";
import multer from "multer";
class casesCotroller {
  // register cases
  static async registerCases(req, res) {
    try {
      const { caseType, caseSubtype, summary } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "no image uploaded" });
      }
      // Ensure that the user is authenticated and the email is attached to req.user
      const caseOwner = req.user.email;
      if (!caseOwner) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const userId=req.user.userId;
      const resisterCases = await Cases.create({
        caseType,
        caseSubtype,
        summary,
        file: req.file.path,
        caseOwner: caseOwner,
        userId:userId
      });
      return res.status(200).json({
        data: resisterCases,
        message: "cases registered successFully",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register cases" });
    }
  }

  // get all cases
  static async getCases(req, res) {
    try {
      const allCases = await Cases.find();
      return res.status(200).json({ data: allCases, message: "allCases" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to access to db" });
    }
  }
  static async getCasesById(req,res){
try{
  const caseByUserId=await Cases.find(req.params.userId);
  console.log(req.params.caseOwner,"email  fro token")
  return res.status(200).json({data:caseByUserId,message:"this all cases you submitted"})


}catch(error){
  console.log(error);
  return res.status(500).json({message:"failed to acess to db"});
}
  }
  // get single cases
  static async getSingleCase(req, res) {
    try {
      const singleCase = await Cases.findOne({ _id: req.params.id });
      return res.status(200).json({ data: singleCase, message: "Single Case" });
    } catch (error) {
      return res.status(400).json({ message: "User case not found" });
    }
  }
  static async updateSingleCase(req, res) {
    try {
      const { caseType, caseSubtype, summary, file } = req.body;
      const caseFound = await Cases.findOne({ _id: req.params.id });
      if (caseType) {
        caseFound.caseType = caseType;
      }
      if (caseSubtype) {
        caseFound.caseSubtype = caseSubtype;
      }
      if (summary) {
        caseFound.summary = summary;
      }
      if (file) {
        caseFound.file = file;
      }

      caseFound.updatedAt = new Date();
      await caseFound.save();
      return res.status(200).json({
        status: "sucess",
        message: "case updated successfully",
        data: caseFound,
      });
    } catch (error) {
      return res.status(500).json({
        status: "internal server error",
        error: error.message,
      });
    }
  }
  static async deleteSingleCase(req, res) {
    try {
      const deleteCase = await Cases.deleteOne({ _id: req.params.id });
      return res
        .status(200)
        .json({ data: deleteCase, message: "deleted data" });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "internal server error", error: error.message });
    }
  }
  static async markAsDoneArchived(req, res) {
    try {
      const { markAsDoneArchived } = req.body;
      const caseFound = await Cases.findOne({ _id: req.params.id });
      if (caseFound) {
        caseFound.markAsDoneArchived = markAsDoneArchived;
      }
      caseFound.updatedAt = new Date();
      await caseFound.save();
      return res.status(200).json({
        status: "sucess",
        message: `case marked as ${caseFound.markedAsDoneArchived} successfully`,
        data: caseFound,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "internal server error", error: error.message });
    }
  }
  static async status(req, res) {
    try {
      const { status } = req.body;
      const caseFound = await Cases.findOne({ _id: req.params.id });
      if (caseFound) {
        caseFound.status = status;
      }
      caseFound.updatedAt = new Date();
      await caseFound.save();
      return res.status(200).json({
        status: "sucess",
        message: `case marked as ${caseFound.status} successfully`,
        data: caseFound,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "internal server error", error: error.message });
    }
  }
  static async assigningCase(req, res) {
    try {
      const { assignedTo } = req.body;
      const caseFound = await Cases.findOne({ _id: req.params.id });
      if (caseFound) {
        caseFound.assignedTo = assignedTo;
      }
      caseFound.updatedAt = new Date();
      await caseFound.save();
      return res.status(200).json({
        status: "sucess",
        message: `case marked as ${caseFound.assignedTo} successfully`,
        data: caseFound,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ status: "internal server error", error: error.message });
    }
  }
  static async exportCaseToPDFById(req, res) {
    try {
      const { id } = req.params;
      const caseData = await Cases.findOne({ _id: id }); // Fetch the case by ID
      
      if (!caseData) {
        return res.status(404).json({ error: "Case not found" });
      }

      const directoryPath = "./exports";
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }

      const doc = new PDFDocument();
      const filePath = path.join(directoryPath, `case_${id}.pdf`);
      doc.pipe(fs.createWriteStream(filePath));

      doc.fontSize(25).text("Case Report", { align: "center" });

      doc
        .fontSize(12)
        .text(`Case ID: ${caseData.id}`, { underline: true })
        .moveDown()
        .text(`Type: ${caseData.caseType}`)
        .text(`Subtype: ${caseData.caseSubtype}`)
        .text(`Summary: ${caseData.summary}`)
        .text(`Owner: ${caseData.caseOwner}`)
        .moveDown();

      doc.end();

      // Wait for the PDF to be written to disk before sending the response
      doc.on("finish", () => {
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="case_${id}.pdf"`
        );
        res.download(filePath, (err) => {
          if (err) {
            console.error("Error downloading file:", err);
            res.status(500).json({ error: "Failed to download PDF" });
          } else {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting file:", err);
              }
            });
          }
        });
      });
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      res
        .status(500)
        .json({ error: "Failed to export to PDF", message: error.message });
    }
  }
}
export default casesCotroller;
