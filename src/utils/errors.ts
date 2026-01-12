import { USER_ONBOARDING } from './messages';

export const ERRORS_GENERAL = {
  INVALID_PARAMS: {
    message: 'Paramêtros inválidos',
    statusCode: 400,
  },
  INTERNAL_SERVER_ERROR: {
    message: 'Erro interno no Servidor',
    statusCode: 500,
  },
};
export const ONBOARDING_USER_ERRORS = {
  INVALID_PARAMS: {
    message: USER_ONBOARDING.INVALID_PARAMS,
    statusCode: 400,
  },
};
