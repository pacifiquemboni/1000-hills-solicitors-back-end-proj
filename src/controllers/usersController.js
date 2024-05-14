import express from 'express';
import bodyParser from 'body-parser';

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";
import verifyEmail from "../varidation/verify.js"
 // Assuming the model is defined as 'User'

// Function to send verification email
async function sendVerificationEmail(email,token) {
  const transporter = nodemailer.createTransport({ 
    service: 'gmail', 
    auth: { 
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD 
    } 
}); 
  
   
  
const mailConfigurations = { 
  
    // It should be a string of sender/server email 
    from: 'EMAIL_USERNAME', 
  
    to: email, 
  
    // Subject of Email 
    subject: 'Email Verification', 
      
    // This would be the text of email body 
    text: `Hi! There, You have recently visited  
           our website and entered your email. 
           Please follow the given link to verify your email 
           http://localhost:10000/verify/${token}  
           Thanks` 
      
}; 
  
transporter.sendMail(mailConfigurations, function(error, info){ 
    // if (error) throw Error(error); 
    console.log('Email Sent Successfully'); 
    
}); 
}

class UsersController {
  static async registerUsers(req, res) {
    try {
      const { idNo, email , firstName, lastName, password,role,phoneNumber,preferredContact,district,sector,cell} = req.body;
      
      // Check if user with the email already exists
      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
      if(!verifyEmail.validateEmail(email)){
        return res.status(400).json({ message: "not email try to inter valid email" });
      }
      if(!verifyEmail.verifyStrongPassword(password)){
        return res.status(400).json({ message: "not Strong password,your password should contained,uppercase(s),special character(s),digit(s),lowercase(s)" });
      }
      if(!verifyEmail.verifyId(idNo)){
        return res.status(400).json({ message: "your national identity card should have 16 characters" });
      }
      // Generate token for email verification
      const token = jwt.sign({ email, idNo, role }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day

      // Send verification email with token
    
      await sendVerificationEmail(email, token);
     const registerUser = await Users.create({
      idNo, email , firstName, lastName, password,role,phoneNumber,preferredContact,district,sector,cell
     }) 

      return res.status(200).json({ message: "Verification email sent" });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  static async getUsers(req,res){
    try{
      const allUsers= await Users.find();
      return res.status(200).json({ data: allUsers, message: "All users" });
    }
    catch(error){
      console.log(error);
      return res.status(500).json({ message: "Failed to access to db" });
    }
  }
  static async verifyEmail(req, res) {
    try {
      const { token } = req.params;
  
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Extract email from the decoded token
      const { email } = decoded;
  
      // Update the 'verified' column to true for the user with the provided email
      const user = await Users.findOneAndUpdate(
        { email },
        { $set: { verified: true } },
        { new: true }
      );
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Send response indicating successful email verification
      return res.status(200).json({ data: user, message: "Email verified successfully" });
    } catch (error) {
      console.error("Error verifying email:", error);
      // Send internal server error response
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}  

export default UsersController;
