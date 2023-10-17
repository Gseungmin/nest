import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { ERRORS, USER_GRADE } from '../utils';

@Injectable()
export class AdminInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as { role: string };
    if (user && user.role === USER_GRADE.VIP)
      return next.handle().pipe(map((data) => data));
    else
      throw new HttpException(ERRORS.USER_NOT_FOUND, HttpStatus.UNAUTHORIZED);
  }
}
