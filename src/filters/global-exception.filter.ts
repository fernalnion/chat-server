import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Config } from 'src/config';
import { ForbittenException, ValidationException } from 'src/models';
import { LogService } from 'src/services/log.service';
import { v4 as uuidv4 } from 'uuid';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LogService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logid = uuidv4();
    const isvalidationError = exception instanceof ValidationException;
    if (!isvalidationError) {
      this.loggerService.info('Exception', { exception: exception, logid });
    }

    if (exception instanceof ForbittenException) {
      return response
        .status((exception as ForbittenException).getStatus())
        .json('invalid');
    }

    const errorresponse: any = {
      timestamp: new Date().toISOString(),
      path: request.url,
      error: true,
      errorMessage: exception?.response?.errormessage || exception.message,
      data: false,
    };

    if (Config.DEBUG && exception.stack && !isvalidationError) {
      errorresponse.stack = exception.stack;
      errorresponse.logid = logid;
    }

    response.status(status).json(errorresponse);
  }
}
