import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | { error: string; statusCode: number; message: string | string[] };

    const isClassValidator = typeof error === 'object';

    if (isClassValidator) {
      response.status(status).json({
        path: request.url,
        method: request.method,
        code: status,
        error: error.message[0],
        timestamp: new Date().toISOString(),
      });
      return;
    }

    response.status(status).json({
      path: request.url,
      method: request.method,
      code: status,
      error: error,
      timestamp: new Date().toISOString(),
    });
  }
}
