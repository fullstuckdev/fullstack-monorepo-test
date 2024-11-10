import winston from 'winston';
import { environment } from '../../config/environment';

export const logger = winston.createLogger({
  level: environment.isEmulator ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
}); 