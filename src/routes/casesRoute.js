import express from "express";
import casesCotroller from "../controllers/casesController.js";
import multer from "multer";
import authMiddleware from "../middleware/authmiddleware.js";
const casesRoute = express.Router();

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "src/documents");
  // },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// resgister cases
casesRoute.post(
  "/register",
  upload.single("file"),

  authMiddleware.isAuthenticated,
  casesCotroller.registerCases
);
// get all cases
casesRoute.get(
  "/",
  authMiddleware.isAuthenticated,
  authMiddleware.checkAdminRole,
  casesCotroller.getCases
);
casesRoute.get("/:userId",
authMiddleware.isAuthenticated,casesCotroller.getCasesById);
// get single cases
casesRoute.get(
  "/singleCase/:id",
  authMiddleware.isAuthenticated,
  casesCotroller.getSingleCase
);
casesRoute.get("/assignedTo/:assignedTo",authMiddleware.isAuthenticated,
casesCotroller.caseByAssigned);
casesRoute.put(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkClientRole,
  authMiddleware.checkAdminRole,
  casesCotroller.updateSingleCase
);
casesRoute.delete(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkClientRole,
  authMiddleware.checkAdminRole,
  casesCotroller.deleteSingleCase
);
// mark as done or archive
casesRoute.patch(
  "/:id",
  authMiddleware.isAuthenticated,
  authMiddleware.checkAdminRole,
  casesCotroller.markAsDoneArchived
);
// change status
casesRoute.patch(
    "/status/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkAdminRole,
    casesCotroller.status
  );
  // assigning case
casesRoute.patch(
    "/assigning/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.checkAdminRole,
    casesCotroller.assigningCase
  );
  //exporting pdf
  casesRoute.get('/pdf/:id', casesCotroller.exportCaseToPDFById)
export default casesRoute;
