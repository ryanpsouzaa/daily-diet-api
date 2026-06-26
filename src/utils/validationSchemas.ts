import z from 'zod';

export const schemas = {
  createUsersSchema: z.object({
    username: z.string(),
    name: z.string(),
    email: z.email(),
    password: z.string(),
  }),

  createMealsSchema: z.object({
    name: z.string(),
    userId: z.uuid(),
    description: z.string(),
    isOnDiet: z.boolean(),
    dietDateTime: z.coerce.date().optional(),
  }),
};

export type schemasKeys = keyof typeof schemas;
