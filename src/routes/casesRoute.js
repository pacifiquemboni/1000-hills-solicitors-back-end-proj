import express from "express";
import casesCotroller from "../controllers/casesController.js";
import  multer from "multer";
const casesRoute=express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/documents');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });


// resgister cases
casesRoute.post("/register",upload.single('file'),casesCotroller.registerCases);
// get all cases
// casesRoute.put("/:id:",upload.single('file'),casesCotroller.u);
casesRoute.get("/",casesCotroller.getCases);
// get single cases
casesRoute.get('/:id', casesCotroller.getSingleCase)
casesRoute.put('/:id', casesCotroller.updateSingleCase)
casesRoute.delete('/:id', casesCotroller.deleteSingleCase)
// update cases
export default casesRoute;