import {z} from "zod";

export const applicationSchema = z.object({
    jobId: z.string().min(1),
    githubLink: z.string().url(),
    linkedinLink: z.string().url(),
    resumeLink: z.string().url(),
    coverLetter: z.string().optional(),
    projectExplanation: z.string().min(1),
    techStack: z.array(z.string()).min(1)
})
