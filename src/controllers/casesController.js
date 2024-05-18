import express from 'express';
import Cases from '../model/caseModel';
import multer from "multer";
class casesCotroller{
    // register cases
    static async registerCases(req,res){
        try{
        const {caseType,caseSubtype,summary,markAsDoneArchived,assignedTo,status}=req.body;

      if (!req.file) {
        return res.status(400).json({ error: "no image uploaded" });
    }
        const resisterCases=await Cases.create({caseType,caseSubtype,summary,file: req.file.path,markAsDoneArchived,assignedTo,status});
        return res.status(200).json({data:resisterCases,message:"cases registered successFully"});
    }catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Failed to register cases" });
    }}

    // get all cases
    static async getCases(req,res){
        try{
            const allCases= await Cases.find();
            return res.status(200).json({ data: allCases, message: "allCases" });
          }
          catch(error){
            console.log(error);
            return res.status(500).json({ message: "Failed to access to db" });
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
      static async updateSingleCase(req,res){
        try{
         const {caseType,caseSubtype,summary,file,markAsDoneArchived,assignedTo,status}=req.body;
         const caseFound=await Cases.findOne({_id:req.params.id});
         if(caseType){
            caseFound.caseType=caseType;
         }
            if(caseSubtype){
                caseFound.caseSubtype=caseSubtype;
             }
             if(summary){
                caseFound.summary=summary;
             }
             if(file){
                caseFound.file=file;
             }
             if(markAsDoneArchived){
                caseFound.markAsDoneArchived=markAsDoneArchived;
             }
             if(assignedTo){
                caseFound.assignedTo=assignedTo;
             }
             if(status){
                caseFound.status=status;
             }
             caseFound.updatedAt=new Date();
             await caseFound.save()
             return res.status(200).json({
               status:"sucess",
               message: "case updated successfully",
               data: caseFound
             })
        
        }
        catch (error) {
            return res.status(500).json({
              status: 'internal server error',
              error: error.message,
            });
          }
      } 
      static async deleteSingleCase(req,res){
        try{
    const deleteCase=await Cases.deleteOne({_id:req.params.id})
    return res.status(200).json({data:deleteCase,message:"deleted data"});
        }
        catch(error){
            return res.status(500).json({status:"internal server error",error:error.message})
        }
      }

}
export default casesCotroller