import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { knex } from '../database/database';
import { z } from 'zod';
import { randomUUID } from 'node:crypto';
import { ONBOARDING_USER_ERRORS } from '../utils/errors';
import { createMeal } from '../services/meals/createMeal';

export default async function mealsRoutes(app: FastifyInstance) {
  app.post('/meals', createMeal);
}
