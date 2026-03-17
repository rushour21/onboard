import mongoose, {Schema, Document} from "mongoose";


export interface Job extends Document{
    title: string;
    description: string;
    requirements: string[];
    responsibilities: string[];
    location: string;
    salary: string;
    jobType: string;
    experience: string;
    skills: string[];
    organization: string;
    postedBy: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    assessmentDescription: string;
    assessmentDueDate: Date;
}

const JobSchema: Schema<Job> = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    responsibilities:{
        type: [String],
        required: [true, "Responsibilities are required"],
    },
    requirements:{
        type: [String],
        required: [true, "Requirements are required"],
    },
    location:{
        type: String,
        required: [true, "Location is required"],
    },
    salary:{
        type: String,
        required: [true, "Salary is required"],
    },
    jobType:{
        type: String,
        required: [true, "Job type is required"],
    },
    experience:{
        type: String,
        required: [true, "Experience is required"],
    },
    skills:{
        type: [String],
        required: [true, "Skills are required"],
    },
    organization:{
        type: String,
        required: [true, "Organization is required"],
    },
    assessmentDescription:{
        type: String,
        required: [true, "Assessment description is required"],
    },
    assessmentDueDate:{
        type: Date,
        required: [true, "Assessment due date is required"],
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Posted by is required"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    
})

