import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainUserDto } from 'src/users/dto/plain-user.dto';
import { Serialize } from 'src/interceptors/serialize-password.interceptor';
import { AuthenticationService } from './authentication.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';

@UseInterceptors(CurrentUserInterceptor)
@Serialize(PlainUserDto)
@Controller('auth')
export class UsersController {
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UsersService,
  ) {}

  @Get('/session')
  getUserSession(@CurrentUser() userCookie, @Session() session) {
    console.log('userCookie --> ', userCookie);
    return session.userId;
  }

  @Post('/signup')
  async signupUser(@Body() body: CreateUserDto, @Session() session) {
    console.log('signupUser with body -->, ', body);
    const user = await this.authenticationService.handleSignup(
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signinUser(@Body() body: CreateUserDto, @Session() session) {
    console.log('signupUser with body -->, ', body);
    const user = await this.authenticationService.handleSignin(
      body.email,
      body.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/logout')
  logoutUser(@Session() session) {
    session.userId = null;
    return session;
  }

  // @Serialize(PlainUserDto) Example of how we could use the Serialize just with one route
  @Get('/:id')
  getUser(@Param('id') userId: number) {
    console.log('getUserById with id -->', userId);
    return this.userService.getUserById(userId);
  }

  @Get()
  getUserByEmail(@Query('email') userEmail: string) {
    console.log('getUserByEmail with email -->', userEmail);
    return this.userService.getUserByEmail(userEmail);
  }

  @Delete('/:id')
  removeUser(@Param('id') userId: number) {
    console.log('removeUSer with id -->', userId);
    return this.userService.removeUser(userId);
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    console.log('updateUser with id --> ', userId, ' and body -->', body);
    this.userService.updateUser(userId, body);
  }
}
