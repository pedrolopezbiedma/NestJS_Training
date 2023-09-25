import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class SerializePasswordInterceptor implements NestInterceptor {
  // This interceptor is going to get executed in every request and is going to hide the users password
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('I am running before handle the request.');

    return next.handle().pipe(
      map((data) => {
        console.log('I am running before the request is sent out');
        return data;
      }),
    );
  }
}
