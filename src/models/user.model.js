import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
















const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    refershToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
//HOOKS
userSchema.pre("save" , async function (next) {
     if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password , 10)
    next()
})
//UserGenerated Methods
userSchema.methods.isPasswordCorrect = async function(password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPAIRY,
    }
  );
};


userSchema.methods.generateAccessToken = function () {
 return jwt.sign(
   {
     _id: this._id,
  
   },
   process.env.REFERSH_TOKEN_SECRET,
   {
     expiresIn: process.env.REFERSH_TOKEN_EXPAIRY,
   }
 );

};

export const User = mongoose.model("User", userSchema);
