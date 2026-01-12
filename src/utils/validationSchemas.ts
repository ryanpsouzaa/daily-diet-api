import z from 'zod';

export const schemas = {
  createUsersSchema: z.object({
    username: z.string(),
    name: z.string(),
    email: z.email(),
  }),
};

export type schemasKeys = keyof typeof schemas;
