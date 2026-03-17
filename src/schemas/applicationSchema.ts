import {z} from "zod";

export const applicationSchema = z.object({
    jobId: z.string(),
    userId: z.string(),
    githubLink: z.string(),
    linkedinLink: z.string(),
    resumeLink: z.string(),
    coverLetter: z.string(),
    projectExplanation: z.string(),
    techStack: z.array(z.string()),
    status: z.enum(["applied", "under_review", "interview" ,"accepted", "rejected"]),
    appliedAt: z.date(),
    updatedAt: z.date()
})
