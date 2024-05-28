import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
 
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  idNo: {
    type: Number,
    required: true
  },
 
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "adminStaff",
  },
  phoneNumber: {
    type: String,
    required: true
  },
  preferredContact: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  cell: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: true,// Initially set as unverified
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resetToken: String,
  resetTokenExpiration: Date
});

const User = mongoose.model('User', userSchema);

export default User;
