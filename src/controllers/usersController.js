import express from 'express';
import bodyParser from 'body-parser';

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";
import verifyEmail from "../varidation/verify.js"
import { JWT } from '../helper/jwt.js';
import User from '../model/userModel.js';
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
      if(!verifyEmail.verifyId(idNo)){
        return res.status(400).json({ message: "Your national identity card number should have 16 characters." });
      }
      if(!verifyEmail.validateEmail(email)){
        return res.status(400).json({ message: "Invalid email address. Please enter a valid email." });
      }
      if(!verifyEmail.verifyStrongPassword(password)){
        return res.status(400).json({ message: "Password not strong enough. Your password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and should be between 8 and 16 characters long." });
      }
      
      // Generate token for email verification
      const token = jwt.sign({ email, idNo, role }, process.env.JWT_SECRET, { expiresIn: '1d' }); // Token expires in 1 day

      // Send verification email with token
    
      await sendVerificationEmail(email, token);
     const registerUser = await Users.create({
      idNo, email , firstName, lastName, password,role,phoneNumber,preferredContact,district,sector,cell
     }) 

      return res.status(200).json({ 
        message: "Verification email sent",
        data:registerUser
       });
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
  static async getSingleUser(req, res){
    try {
      const singleUser = await Users.findOne({_id: req.params.id})
      if(!singleUser){
        return res.status(400).json({
          status:"Fail",
          message:"user with that Id does not exist!"
        })
      }
      return res.status(200).json({
        status:"success",
        message:"User Profile exist",
        data:singleUser
      })
    } catch (error) {
      return res.status(500).json({
        status: "Fail",
        message:error.message
      })
    }
  }
  static async updateSingleUser(req, res){
    try {
      const { idNo, firstName, lastName,phoneNumber,preferredContact,district,sector,cell} = req.body;
      const userFound = await Users.findOne({_id: req.params.id})
      if(idNo){
        userFound.idNo=idNo;
      }
      if(firstName){
        userFound.firstName=firstName;
      }if(lastName){
        userFound.lastName=lastName;
      }if(phoneNumber){
        userFound.phoneNumber=phoneNumber;
      }if(preferredContact){
        userFound.preferredContact=preferredContact;
      }if(district){
        userFound.district=district;
      }if(sector){
        userFound.sector=sector;
      }if(cell){
        userFound.cell=cell;
      }
      userFound.updatedAt= new Date();
      if(req.body.email){
        return res.status(400).json({
          status:"bad request",
          message:"email can not be updated"
        })
      }
      await userFound.save()
      return res.status(200).json({
        status:"sucess",
        message: "profile updated successfully",
        data: userFound
      })

    } catch (error) {
      return res.status(500).json({
        status: 'internal server error',
        error: err.message,
      });
    }
  }
  static async updateUserPassword(req,res){
    try {
      const {oldPassword, newPassword} = req.body;
      const userFound = await Users.findOne({_id:req.params.id})
      if(oldPassword!==userFound.password){
        return res.status(400).json({
          stautus:"Fail",
          message:"old password is not correct"
        })
      }
      userFound.password = newPassword;
      await userFound.save();
      return res.status(200).json({ data: userFound.password, message: "Password Updated successfully" });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: error.message
      });
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
  static async loginUser(req,res){
    try {
      const {email, password} = req.body;

      const userFound = await Users.findOne({email})
      if(!userFound){
        return res.status(404).json({
          status:"fail",
          message:"Account does not exist"
        })
      }
      
      if(password!== userFound.password){
        return res.status(400).json({
          status: "fail",
          message: "Incorect credentials"
        })
      }
      if(userFound.verified !== true){
        return res.status(400).json({
          status:"Fail",
          message:"Your Acccount is not verified!🤷‍♀️"
        })
      }
      const token = JWT.generateJwt({
        userId: userFound._id,
        role: userFound.role,
        firstName: userFound.firstName,
        isernid: userFound.idNo
      })
      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
        role:userFound.role
      })
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:error.message
      })
    }
  }
}  

export default UsersController;
