import type { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../utils/logger';
import GeneralErrorResponse from '../../exceptions/GeneralErrorResponse';
import statusCode from '../../utils/statusCode';
import { ONBOARDING_USER_ERRORS } from '../../utils/errors';
import { validateBody } from '../../utils/validation';
import { randomUUID } from 'node:crypto';
import { knex } from '../../database/database';
import type { User } from '../../@types/User';

export default async function createUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  logger.info('IN - createUser');
  logger.debug(request.body, 'Request Body =>');

  //criar @types do request
  const bodyRequest: any = request.body;

  const { username, name, email } = validateBody(
    bodyRequest,
    'createUsersSchema',
  );
  logger.debug({ username, name, email }, 'User info');

  const user = createUserEntity(username, name, email);

  await insertUser(user);

  logger.info('OUT - createUser');
  //todo: melhorar isso em um HttpResponse
  reply.code(statusCode.CREATED).send({
    _id: user.id,
    message: 'Usuário criado',
  });
}

function createUserEntity(username: string, name: string, email: string) {
  const user: User = {
    id: randomUUID(),
    sessionId: randomUUID(),
    username,
    name,
    email,
  };

  return user;
}

async function insertUser(user: User) {
  logger.info('IN - insertUser');
  await knex('users').insert(user);

  logger.info('OUT - insertUser');
}
