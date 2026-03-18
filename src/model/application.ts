import mongoose, { Schema, Document } from "mongoose";

export interface Application extends Document {
  jobId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  githubLink: string;
  linkedinLink: string;
  resumeLink: string;
  coverLetter?: string;
  projectExplanation: string;
  techStack: string[];
  status: "applied" | "under_review" | "interview" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<Application>(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    githubLink: { type: String, required: true },
    linkedinLink: { type: String, required: true },
    resumeLink: { type: String, required: true },
    coverLetter: { type: String },
    projectExplanation: { type: String, required: true },
    techStack: { type: [String], required: true },
    status: {
      type: String,
      enum: ["applied", "under_review", "interview", "accepted", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

const ApplicationModel =
  (mongoose.models.Application as mongoose.Model<Application>) ||
  mongoose.model<Application>("Application", ApplicationSchema);

export default ApplicationModel;