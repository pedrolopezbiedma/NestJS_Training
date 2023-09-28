import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    console.log('Estoy en el current user interceptor');

    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};

    if (userId) {
      const user = this.usersService.getUserById(userId);
      request.currentUser = user; // We include the current user into the actual request. This will be used by the CurrentUser decorator.
    }

    return handler.handle();
  }
}
