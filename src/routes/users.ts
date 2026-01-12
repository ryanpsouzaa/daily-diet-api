import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { knex } from '../database/database';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { ONBOARDING_USER_ERRORS } from '../utils/errors';
import createUser from '../services/users/createUser';

export default async function usersRoutes(app: FastifyInstance) {
  app.post('/users', createUser);
}
