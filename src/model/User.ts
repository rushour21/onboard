import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document{
    name: string;
    email: string;
    password: string;
    role: string;
    organization?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    name :{
        type: String,
        required : [true, "Name is required"],
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
    },
    role:{
        type: String,
        enum: ["candidate", "company"],
        default: "candidate"
    },
    organization:{
        type: String,
        trim: true,
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;