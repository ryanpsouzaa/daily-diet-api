import { type schemasKeys, schemas } from './validationSchemas';
import GeneralErrorResponse from '../exceptions/GeneralErrorResponse';
import { ERRORS_GENERAL } from './errors';
import logger from './logger';

export function validateBody(data: object, schemaName: schemasKeys) {
  logger.info('IN - validateBody');
  const schemaValidation = schemas[schemaName];

  const result = schemaValidation.safeParse(data);

  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => {
      return `${issue.path.join('.')}: ${issue.message}`;
    });

    throw new GeneralErrorResponse(
      ERRORS_GENERAL.INVALID_PARAMS.message,
      ERRORS_GENERAL.INVALID_PARAMS.statusCode,
      formattedErrors,
    );
  }

  logger.info('OUT - validateBody');
  return result.data;
}
