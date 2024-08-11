import express from "express";
import bodyParser from "body-parser";

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";
import verifyEmail from "../varidation/verify.js";
import { JWT } from "../helper/jwt.js";
import User from "../model/userModel.js";
import bcrypt from "bcrypt";
//  Assuming the model is defined as 'User'

// Function to send verification email
async function sendVerificationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailConfigurations = {
    // It should be a string of sender/server email
    from: "EMAIL_USERNAME",

    to: email,

    // Subject of Email
    subject: "Email Verification",

    // This would be the text of email body
    html: `
     <div style="width: 90%; height: fitcontent;border: 2px solid #021742;border-radius: 20px;">
    <div
      style="
        width: 80%;
        max-width: 600px;
        margin: auto;
        border-bottom: 1px solid;
      "
    >
      <img
        src="https://res.cloudinary.com/dndfvxckz/image/upload/v1718273194/t8y9k778uea4tlzcidnn.jpg"
        style="width: 70%; height: 150px; display: block; margin: auto"
      />
    </div>
    <div
      style="
        width: 80%;
        max-width: 600px;
        margin: auto;
        text-align: left;
        font-family: Arial, sans-serif;
      "
    >
      <p style="font-size: 16px">Dear ${email},</p>
      <p style="font-size: 16px">
        Thank you for your interest in joining 1000 Hills solicitors! You're just one step away from completing the sign-up process.
      </p>
      <p style="font-size: 16px">
        Please click the link below to confirm your account:<br><br>
        <a
          href="${process.env.FRONT_END_URL}/verify?token=${token}&email=${email}"
          target="_blank"
          style="color: #007bff; text-decoration: none"
          >Confirm Your Account</a
        >
        
      </p>
      <p>If you did not initiate this request, please disregard this email.</p>

<p style="font-size: 16px">We're excited to have you with us!</p>
<p style="font-size: 16px">Best regards,</p>
<p style="font-size: 16px">1000 Hills Solicitors Team</p>
    </div>
    
  </div>
    
    
    `,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    // if (error) throw Error(error);
    console.log("Email Sent Successfully");
  });
}

class UsersController {
  static async registerUsers(req, res) {
    try {
      const {
        idNo,
        email,
        firstName,
        lastName,
        password,
        role,
        phoneNumber,
        preferredContact,
        district,
        sector,
        cell,
      } = req.body;

      // Check if user with the email already exists
      const existingUser = await Users.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ status: "fail", message: "Email already exists" });
      }
      if (!verifyEmail.verifyId(idNo)) {
        return res.status(400).json({
          status: "fail",
          message:
            "Your national identity card number should have 16 characters.",
        });
      }
      if (!verifyEmail.validateEmail(email)) {
        return res.status(400).json({
          status: "fail",
          message: "Invalid email address. Please enter a valid email.",
        });
      }
      if (!verifyEmail.verifyStrongPassword(password)) {
        return res.status(400).json({
          status: "fail",
          message:
            "Password not strong enough. Your password should contain at least one uppercase letter, one lowercase letter, one digit, one special character, and should be between 8 and 16 characters long.",
        });
      }
      if (
        !idNo ||
        !email ||
        !firstName ||
        !lastName ||
        !password ||
        !phoneNumber ||
        !preferredContact ||
        !district ||
        !sector ||
        !cell
      ) {
        return res.status(400).json({
          status: "fail",
          message: "All fields are required",
        });
      }
      // Generate token for email verification
      const token = jwt.sign({ email, idNo, role }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      }); // Token expires in 1 day

      // Send verification email with token

      await sendVerificationEmail(email, token);
      // const salt = bcrypt.genSaltSync(12)
      // const hashPassword = bcrypt.hashSync(password, 10);
      const registerUser = await Users.create({
        idNo,
        email,
        firstName,
        lastName,
        password,
        role,
        phoneNumber,
        preferredContact,
        district,
        sector,
        cell,
      });

      return res.status(200).json({
        status: "success",
        message: "Verification email sent",
        data: registerUser,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({
        status: "fail",
        error: "Failed to register user",
      });
    }
  }

  static async getUsers(req, res) {
    try {
      const allUsers = await Users.find();
      return res.status(200).json({ data: allUsers, message: "All users" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Failed to access to db" });
    }
  }
  static async getSingleUser(req, res) {
    try {
      const singleUser = await Users.findOne({ _id: req.params.id });
      if (!singleUser) {
        return res.status(400).json({
          status: "Fail",
          message: "user with that Id does not exist!",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "User Profile exist",
        data: singleUser,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
  static async updateSingleUser(req, res) {
    try {
      const {
        idNo,
        firstName,
        lastName,
        phoneNumber,
        preferredContact,
        district,
        sector,
        cell,
      } = req.body;
      const userFound = await Users.findOne({ _id: req.params.id });
      if (idNo) {
        userFound.idNo = idNo;
      }
      if (firstName) {
        userFound.firstName = firstName;
      }
      if (lastName) {
        userFound.lastName = lastName;
      }
      if (phoneNumber) {
        userFound.phoneNumber = phoneNumber;
      }
      if (preferredContact) {
        userFound.preferredContact = preferredContact;
      }
      if (district) {
        userFound.district = district;
      }
      if (sector) {
        userFound.sector = sector;
      }
      if (cell) {
        userFound.cell = cell;
      }
      userFound.updatedAt = new Date();
      if (req.body.email) {
        return res.status(400).json({
          status: "bad request",
          message: "email can not be updated",
        });
      }
      await userFound.save();
      return res.status(200).json({
        status: "sucess",
        message: "profile updated successfully",
        data: userFound,
      });
    } catch (error) {
      return res.status(500).json({
        status: "internal server error",
        error: err.message,
      });
    }
  }
  static async updateUserPassword(req, res) {
    try {
      const { oldPassword, newPassword } = req.body;
      const userFound = await Users.findOne({ _id: req.params.id });
      if (oldPassword !== userFound.password) {
        return res.status(400).json({
          stautus: "Fail",
          message: "old password is not correct",
        });
      }
      userFound.password = newPassword;
      await userFound.save();
      return res.status(200).json({
        data: userFound.password,
        message: "Password Updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        message: error.message,
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
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      // Send response indicating successful email verification
      return res.status(200).json({
        data: user,
        status: "success",
        message: "Email verified successfully",
      });
    } catch (error) {
      console.error("Error verifying email:", error);
      // Send internal server error response
      return res.status(500).json({
        status: "fail",
        error: "Internal server error",
      });
    }
  }
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const userFound = await Users.findOne({ email });
      if (!userFound) {
        return res.status(404).json({
          status: "fail",
          message: "Account does not exist",
        });
      }

      if (password !== userFound.password) {
        return res.status(400).json({
          status: "fail",
          message: "Incorect credentials",
        });
      }
      if (userFound.verified !== true) {
        return res.status(400).json({
          status: "Fail",
          message: "Your Acccount is not verified!🤷‍♀️",
        });
      }
      const token = JWT.generateJwt({
        userId: userFound._id,
        role: userFound.role,
        email: userFound.email,
        firstName: userFound.firstName,
        isernid: userFound.idNo,
      });
      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token,
        role: userFound.role,
        user: {
          userId: userFound._id,
          role: userFound.role,
          email: userFound.email,
          firstName: userFound.firstName,
          isernid: userFound.idNo,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  }
  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const findUser = await User.findOne({ email });
      if (!findUser) {
        return res.status(400).json({ message: "User not found yoooo" });
      }

      const token = jwt.sign({ userId: findUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      findUser.resetToken = token;
      findUser.resetTokenExpiration = Date.now() + 3600000; // 1 hour
      await findUser.save();

      console.log("Token generated:", token);
      console.log(
        "Token expiration:",
        new Date(findUser.resetTokenExpiration).toISOString()
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      const mailOptions = {
        to: findUser.email,
        from: process.env.EMAIL_USERNAME,
        subject: "Password Reset",
        html: `<div style="width: 90%; height: fitcontent;border: 2px solid #021742;border-radius: 20px;">
    <div style="width: 60%; max-width: 600px; margin: auto;border-bottom: 1px solid;">
      <img src="https://res.cloudinary.com/dndfvxckz/image/upload/v1718273194/t8y9k778uea4tlzcidnn.jpg" style="width: 100%; height: 200px; display: block; margin: auto;">
    </div>
    <div style="width: 80%; max-width: 600px; margin: auto; text-align: left; font-family: Arial, sans-serif;">
      <p style="font-size: 16px;">Dear ${email},</p>
      <p style="font-size: 16px;">We received a request to reset your password. To proceed, please click the link below:<br><br><a href="${
        process.env.FRONT_END_URL
      }/resetpassword?token=${token}">Reset Your Password</a>.</p>
      <p>For security reasons, this link will expire in [${new Date(
        findUser.resetTokenExpiration
      ).toISOString()}]. If you did not request a password reset, please ignore this email or contact our support team. </p>

      <p>Thank you,</p>
<p>1000 Hills Solicitors Support Team</p>
    </div>
  </div> `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err)
          return res.status(500).json({
            status: "fail",
            message: err.error,
          });
      });
      res.status(200).json({
        status: "success",
        message: "Reset email sent",
      });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  static async paramsToken(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decodedToken);

      const user = await User.findOne({
        _id: decodedToken.userId,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });

      if (!user) {
        console.log("Invalid or expired token");
        return res.status(400).send("Invalid or expired token");
      }

      // Hash the password before saving
      // const hashedPassword = await bcrypt.hash(password, 12);
      user.password = password;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.log("Error verifying token:", error.message);
      return res.status(400).send({ message: "Invalid or expired token" });
    }
  }
}
export default UsersController;
