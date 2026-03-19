import {z} from "zod";

export const addJobSchema = z.object({
    title: z.string().min(2),
    description: z.string(),
    requirements: z.array(z.string()),
    responsibilities: z.array(z.string()),
    location: z.string(),
    salary: z.string(),
    jobType: z.string(),
    experience: z.string(),
    skills: z.array(z.string()),
    organization: z.string(),
    assessmentDescription: z.string(),
    assessmentDueDate: z.coerce.date(),
})
    