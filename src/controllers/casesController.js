import express from "express";
import path from "path"; // Import the path module
import PDFDocument from "pdfkit";
import fs from "fs";
import Cases from "../model/caseModel";
import multer from "multer";
import cloudinary from "../cloudinary/cloudinary.js";

class casesCotroller {
  // register cases

  static async registerCases(req, res) {
    try {
      const { caseType, caseSubtype, summary } = req.body;

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Ensure that the user is authenticated and the email is attached to req.user
      const caseOwner = req.user.email;
      if (!caseOwner) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const userId = req.user.userId;

      // Determine the resource type based on MIME type
      let resourceType = "image";
      if (
        req.file.mimetype !== "image/jpeg" &&
        req.file.mimetype !== "image/png" &&
        req.file.mimetype !== "image/gif"
      ) {
        resourceType = "raw";
      }

      // Upload file to Cloudinary
      cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: resourceType,
        },
        async (err, result) => {
          if (err) {
            console.error("Error uploading file:", err);
            return res
              .status(500)
              .json({ success: false, message: "File upload error" });
          }
          console.log("File uploaded successfully:", result);

          // Save case details in the database
          const registeredCase = await Cases.create({
            caseType,
            caseSubtype,
            summary,
            file: result.secure_url, // Use the Cloudinary URL
            caseOwner: caseOwner,
            userId: userId,
          });

          return res.status(200).json({
            data: registeredCase,
            message: "Case registered successfully",
          });
        }
      );
    } catch (error) {
      console.error("Error registering case:", error);
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
      return res
        .status(500)
        .json({ message: "Failed to access to db please check again" });
    }
  }
  static async getCasesById(req, res) {
    try {
      const userId = req.params.userId;

      // Ensure the parameter passed to find() is an object
      const caseByUserId = await Cases.find({ userId: userId });
      console.log(req.params.caseOwner, "email  fro token");
      return res
        .status(200)
        .json({ data: caseByUserId, message: "this all cases you submitted" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "failed to acess to db" });
    }
  }
  // get cases by assigned to
  static async caseByAssigned(req, res) {
    try {
      const assignedTo = req.params.assignedTo;

      const assignedCase = await Cases.find({ assignedTo: assignedTo });
      // console.log(assignedCase.caseType,"casetype")
      // console.log(assignedCase.status,"caseType")// Await the result of findOne()
      return res
        .status(200)
        .json({ data: assignedCase, message: "Your assigned case is this" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Failed to get cases of assignedTo" });
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
      const caseFound = await Cases.findById(req.params.id); // Use findById for better readability
  
      if (!caseFound) {
        return res.status(404).json({
          status: "error",
          message: "Case not found",
        });
      }
  
      caseFound.markAsDoneArchived = markAsDoneArchived; // Correct field name
      caseFound.updatedAt = new Date();
  
      await caseFound.save();
  
      return res.status(200).json({
        status: "success",
        message: `Case marked as ${caseFound.markAsDoneArchived} successfully`,
        data: caseFound,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message,
      });
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
