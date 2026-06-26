import type { FastifyReply, FastifyRequest } from 'fastify';
import logger from '../../utils/logger';
import GeneralErrorResponse from '../../exceptions/GeneralErrorResponse';
import { USER_ONBOARDING_ERRORS } from '../../utils/messages';
import statusCode from '../../utils/statusCode';
import { validateBody } from '../../utils/validation';
import { createHmac, randomUUID } from 'node:crypto';
import UserModel from '../../models/UserModel';
import type { User } from '../../@types/users/User';
import type { CreateUserRequest } from '../../@types/users/CreateUserRequest';
import { env } from '../../env/index.js';

export default async function createUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  //todo: melhorar captura de erros -> deve ser em codigo
  logger.info('IN - createUser');

  const bodyRequest: any = request.body;

  const createUserBody: CreateUserRequest = validateBody(
    bodyRequest,
    'createUsersSchema',
  );

  await validateUserEmail(createUserBody.email);

  createUserBody.password = hashPassword(createUserBody.password);

  const user = buildUserData(createUserBody);

  await insertUser(user);

  logger.info('OUT - createUser');

  reply.code(statusCode.CREATED).send({
    _id: user.id,
    message: 'Usuário criado',
  });
}

async function validateUserEmail(email: string) {
  const result = await UserModel.findByEmail(email);

  if (result) {
    throw new GeneralErrorResponse(
      USER_ONBOARDING_ERRORS.EMAIL_ALREADY_EXISTS,
      statusCode.BAD_REQUEST,
    );
  }
}

function buildUserData(body: CreateUserRequest): User {
  const user: User = {
    id: randomUUID(),
    sessionId: randomUUID(),
    username: body.username,
    name: body.name,
    email: body.email,
    password: body.password,
  };

  return user;
}

async function insertUser(user: User) {
  logger.info('IN - insertUser');
  const userInserted = await UserModel.create(user);

  logger.info('OUT - insertUser');
  return userInserted;
}

function hashPassword(password: string) {
  return createHmac('sha256', env.HMAC_SECRET).update(password).digest('hex');
}
