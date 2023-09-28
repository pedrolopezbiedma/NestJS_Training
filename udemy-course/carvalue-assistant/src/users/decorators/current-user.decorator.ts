import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator to be used within the controllers.
// Idea is for this controller to retrieve the currentUser information.
// As its not possible to get an instance of the UsersService within a decorator, we are building current-user.interceptor.ts to calculate it and put it inside the request.
// Once the user is inside the request, we get it and retrieve it.
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
