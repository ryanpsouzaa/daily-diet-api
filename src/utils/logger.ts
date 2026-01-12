import pino, { type LoggerOptions } from 'pino';
import { env } from '../env/index.js';

const isDevelopment = env.NODE_ENV === 'development';

const options: LoggerOptions = {
  level: env.LOG_LEVEL || 'info',
};

if (isDevelopment) {
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname',
      translateTime: 'HH:MM:ss Z',
    },
  };
}

const logger = pino(options);
export default logger;
