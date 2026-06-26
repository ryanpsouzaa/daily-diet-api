import pino, { type LoggerOptions } from 'pino';
import { env } from '../env/index.js';

const isDevelopment = env.NODE_ENV === 'development';

const options: LoggerOptions = {
  level: env.LOG_LEVEL || 'info',
  // 👇 Adiciona o hook para inverter os parâmetros globalmente
  hooks: {
    logMethod(inputArgs, method) {
      if (inputArgs.length >= 2) {
        const [arg1, arg2] = inputArgs;

        // Se o primeiro argumento for o texto e o segundo for o objeto, inverte
        if (typeof arg1 === 'string' && typeof arg2 === 'object') {
          return method.apply(this, [arg2, arg1, ...inputArgs.slice(2)]);
        }
      }
      return method.apply(this, inputArgs);
    },
  },
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
