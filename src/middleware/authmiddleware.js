import jwt from "jsonwebtoken";

class authMiddleware{
  static async isAuthenticated(req, res,  next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) {
        return res.status(401).json({
          status: "Fail",
          message: "Missing authorization token"
        });
      }
      const token = authorization.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({
          status: "Fail",
          message: "Unauthorized action"
        });
      }
      const secretkey =process.env.JWT_SECRET;
      const user = jwt.verify(token, secretkey);
      // console.log(user,'user who')
      
      req.user = user;

      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          status: "Fail",
          message: "Invalid token"
        });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({
          status: "Fail",
          message: "Token expired"
        });
      } else {
        return res.status(500).json({
          status: "error auth",
          message: error.message
        });
      }
    }
  }
  static async checkClientRole(req,res,next){
    try {
      const user = req.user
      if(user.role == "client"){
        return next();
      }
      return res.status(403).json({
        status:"fail",
        message: "You do not have a permission to perform this action"
      })
    } catch (error) {
      return res.status(500).json({
        status:"error",
        message:error.message
      })
    }
  }
  static async checkAdminRole(req,res,next){
    try {
      const user = req.user
      if(user.role == "admin"){
        return next();
      }
      return res.status(4003).json({
        status:"fail",
        message: "You do not have a permission to perform this action"
      })
    } catch (error) {
      return res.status(500).json({
        status:"error",
        message:error.message
      })
    }
  }
  static async checkAdminStaffRole(req,res,next){
    try {
      const user = req.user
      if(user.role == "adminStaff"){
        return next();
      }
      return res.status(4003).json({
        status:"fail",
        message: "You do not have a permission to perform this action"
      })
    } catch (error) {
      return res.status(500).json({
        status:"error",
        message:error.message
      })
    }
  }
  static async checkUserRole(req, res, next) {
    try {
      const user = req.user;
  
      // Check if user role is "admin" or "client"
      if (user.role === "admin" || user.role === "client") {
        return next();
      }
  
      // If role is not "admin" or "client", return a 403 Forbidden response
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action"
      });
    } catch (error) {
      // Handle any unexpected errors
      return res.status(500).json({
        status: "error",
        message: error.message
      });
    }
  }
  
}
export default authMiddleware