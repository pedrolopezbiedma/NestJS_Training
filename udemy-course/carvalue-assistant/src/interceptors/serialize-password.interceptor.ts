import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export class SerializePasswordInterceptor implements NestInterceptor {
  // The constructor receives the Dto we are going to use to transform the response to.
  constructor(private dto: any) {}

  // This interceptor is going to get executed in every request and
  // is going transform is to the specified dto in the constructor.
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('I am running before handle the request.');

    return next.handle().pipe(
      map((data) => {
        console.log('I am running before the request is sent out');
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
