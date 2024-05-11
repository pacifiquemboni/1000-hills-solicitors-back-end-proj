import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  idNo: {
    type: Number,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  confirmPassword: {
    type: String,
    required: false
  },
  userName: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  preferredContact: {
    type: String,
    required: false
  },
  district: {
    type: String,
    required: false
  },
  sector: {
    type: String,
    required: false
  },
  cell: {
    type: String,
    required: false
  },
  verified: {
    type: Boolean,
    default: false // Initially set as unverified
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;
