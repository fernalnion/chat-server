import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class LogService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}
  info = (message: any) => this.logger.log(message);
  error = (message: any) => this.logger.error(message);
  warn = (message: any) => this.logger.warn(message);
}
