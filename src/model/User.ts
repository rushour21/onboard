import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export interface User extends Document {
  name: string
  email: string
  password: string
  role: "candidate" | "company"
  organization?: string
  createdAt: Date
  updatedAt: Date


  validatePassword(inputPassword: string): Promise<boolean>
  generateToken(): string
}

const UserSchema: Schema<User> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    password: {
      type: String,
      required: [true, "Password is required"]
    },
    role: {
      type: String,
      enum: ["candidate", "company"],
      default: "candidate"
    },
    organization: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)


//Validate Password
UserSchema.methods.validatePassword = async function (inputPassword: string) {
  return await bcrypt.compare(inputPassword, this.password)
}


// Generate JWT Token
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      role: this.role
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )
}


const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema)

export default UserModel