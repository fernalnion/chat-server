import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  info = (message: string, ...meta: any[]) => this.logger.log(message, meta);
  error = (message: string, ...meta: any[]) => this.logger.error(message, meta);
  warn = (message: string, ...meta: any[]) => this.logger.warn(message, meta);
}
