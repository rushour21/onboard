import mongoose, {Schema, Document} from "mongoose";

export interface Application extends Document{
    jobId: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    githubLink: string;
    linkedinLink: string;
    resumeLink: string;
    coverLetter: string;
    projectExplanation: string;
    techStack: string[];
    status: string;
    appliedAt: Date;
    updatedAt: Date;
}

const ApplicationSchema: Schema<Application> = new Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: [true, "Job ID is required"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    githubLink: {
        type: String,
        required: [true, "Github link is required"],
    },
    linkedinLink: {
        type: String,
        required: [true, "Linkedin link is required"],
    },
    resumeLink: {
        type: String,
        required: [true, "Resume link is required"],
    },
    coverLetter: {
        type: String,
    },
    projectExplanation: {
        type: String,
        required: [true, "Project explanation is required"],
    },
    techStack: {
        type: [String],
        required: [true, "Tech stack is required"],
    },
    status: {
        type: String,
        enum: ["applied", "under_review", "interview" ,"accepted", "rejected"],
        default: "applied",
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})
    