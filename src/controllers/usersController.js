import express from "express";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Users from "../model/userModel.js"; // Assuming the model is defined as 'User'

// Function to send verification email
async function sendVerificationEmail(email, token) {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Construct the verification email
    const mailConfigurations = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Email Verification',
      html: `<p>Click the following <a href="http://localhost:10001/${token}">link</a> to verify your email.</p>`
    };
    await transporter.sendMail(mailConfigurations);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

class UsersController {
  static async registerUsers(req, res) {
    try {
      const { idNo, firstName, email } = req.body;
      
      // Check if user with the email already exists
      const existingUser = await Users.findOne({ email });

      // if (existingUser) {
      //   return res.status(409).json({ message: "Email already exists" });
      // }

      // Generate token for email verification
      const token = jwt.sign({ email, idNo, firstName }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day

      // Send verification email with token
      await sendVerificationEmail(email, token);

      return res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  static async getUsers(req,res){
    try{
      const allUsers= await Users.find()
      return res.status(200).json({data:allUsers,message:"all users"})

    }
    catch(error){
      console.log(error)
      return res.status(500).json({message:"failed to access to db"})
    }

  }

  static async verifyEmail(req, res) {
    try {
      // Get token from query parameters
      const token = req.query.token;

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Update user's email verification status in the database
      const user = await User.findOneAndUpdate(
          { email: decoded.email },
          { $set: { verified: true } },
          { new: true } // Return the updated document
      );

      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Save user data to the database after verification
      await user.save();

      return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
      console.error("Error verifying email:", error);
      res.status(400).json({ error: "Invalid or expired token" });
  }
}
}

export default UsersController;
