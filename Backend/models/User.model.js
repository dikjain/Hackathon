import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema({
  name: {
    type: "String",
    required: true
  },
  bio: {
    type: "String",
    required: true
  },
  email:{
    type:"String",
    unique:true,
    required: true
  },
  password: {
    type:"String",
    required: true
  },
  createdAt: {
    type: "Date",
    default: Date.now,
  },
  isSeller:{
    type:Boolean,
    default:false
  },
  img: {
    type: "String",
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  }
},{timestamp: true})

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); 
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); 
  next();
});

const User = mongoose.model("User", UserSchema)

export default User;