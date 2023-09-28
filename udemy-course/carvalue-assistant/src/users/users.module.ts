import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthenticationService } from './authentication.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthenticationService, CurrentUserInterceptor],
  controllers: [UsersController],
})
export class UsersModule {}
