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
    const error = exception.getResponse() as {
      error: string;
      statusCode: number;
      message: string | string[];
    };

    let errorMessage = error.message;

    if (typeof error.message === 'object') {
      errorMessage = error.message[0];
    }

    response.status(status).json({
      path: request.url,
      method: request.method,
      code: status,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    });
    return;
  }
}
