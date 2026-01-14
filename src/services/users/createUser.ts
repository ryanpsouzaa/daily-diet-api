import type { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../utils/logger';
import GeneralErrorResponse from '../../exceptions/GeneralErrorResponse';
import { ONBOARDING_USER_ERRORS } from '../../utils/errors';
import statusCode from '../../utils/statusCode';
import { validateBody } from '../../utils/validation';
import { randomUUID } from 'node:crypto';
import UserModel from '../../models/UserModel';
import type { User } from '../../@types/users/User';
import type { CreateUserRequest } from '../../@types/users/CreateUserRequest';

export default async function createUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  //todo: melhorar captura de erros -> deve ser em codigo
  logger.info('IN - createUser');
  logger.debug(request.body, 'Request Body =>');

  const bodyRequest: any = request.body;

  const createUserBody: CreateUserRequest = validateBody(
    bodyRequest,
    'createUsersSchema',
  );
  logger.debug(createUserBody, 'User info');

  const user = createUserEntity(createUserBody);

  await insertUser(user);

  logger.info('OUT - createUser');
  //todo: melhorar isso em um HttpResponse
  reply.code(statusCode.CREATED).send({
    _id: user.id,
    message: 'Usuário criado',
  });
}

function createUserEntity(body: CreateUserRequest): User {
  const user: User = {
    id: randomUUID(),
    sessionId: randomUUID(),
    username: body.username,
    name: body.name,
    email: body.email,
  };

  return user;
}

async function insertUser(user: User) {
  logger.info('IN - insertUser');
  const userInserted = await UserModel.create(user);

  logger.info('OUT - insertUser');
  return userInserted;
}
