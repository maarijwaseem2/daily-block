import { optional, z } from 'zod';

export const projectCategories = {
    jupiterSpace: 'Jupiter Space',
    otherCategory: 'Other Category',
};

export const addProjectSchema = z.object({
    projectName: z.string().min(1).max(50),
    projectCategory: z.string().min(1).refine(value => Object.values(projectCategories).includes(value), {
        message: 'Invalid project category',
    }),
    startingDate: z.coerce.date(),
    endingDate: z.coerce.date(),
    projectImage: z.any(),
    tasks: z.array(z.object({
        taskName: z.string(),
        taskUrl: z.string(),
        taskDescription: z.string(),
    })).optional(),
}).refine(data => data.endingDate > data.startingDate, {
    message: 'Ending date must be greater than starting date',
    path: ['endingDate']
}).refine(data => data.projectImage !== undefined, {
    message: 'Please select an image',
    path: ['projectImage']
});
