import fastify from 'fastify';
import cookies from '@fastify/cookie';
import usersRoutes from './routes/usersRoutes';
import mealsRoutes from './routes/mealsRoutes';
import GeneralErrorResponse from './exceptions/GeneralErrorResponse';
import logger from '../src/utils/logger';

export const app = fastify();

app.register(cookies);
app.register(usersRoutes);
app.register(mealsRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof GeneralErrorResponse) {
    return reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      message: error.message,
      errors: error.validationMessages,
    });
  }

  logger.error(error);
  return reply.status(500).send({
    statusCode: 500,
    error: 'Erro interno no servidor',
    message: 'Ocorreu um erro inesperado',
  });
});
