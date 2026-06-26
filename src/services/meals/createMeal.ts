import type { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../utils/logger';
import { validateBody } from '../../utils/validation';
import type { CreateMealRequest } from '../../@types/meals/CreateMealRequest';

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  logger.info('IN - createMeal');

  //todo: pegar sessionId ou userId dos headers e realizar busca do userId
  const createMealRequest: CreateMealRequest = validateBody(
    request.body as any,
    'createMealsSchema',
  );

  logger.info('OUT - createMeal');
}
