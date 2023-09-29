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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainUserDto } from './dto/plain-user.dto';
import { Serialize } from './../interceptors/serialize-password.interceptor';
import { AuthenticationService } from './authentication.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthGuard } from './guards/auth.guard';

@Serialize(PlainUserDto) // Use a interceptor in a stylish way, for the whole controller.
// @UseInterceptors(CurrentUserInterceptor) // Use an interceptor in the regular way, for the whole controller. Instead of declaring it here, we will declare it globally within the module.
@Controller('auth')
export class UsersController {
  constructor(
    private authenticationService: AuthenticationService,
    private usersService: UsersService,
  ) {}

  @Get('/session')
  // @UseInterceptors(CurrentUserInterceptor) // Use an interceptor in the regular way, just for one route handler.
  @UseGuards(AuthGuard)
  getUserSession(@CurrentUser() userCookie, @Session() session) {
    console.log('GET userCookie --> ', userCookie);
    return session.userId;
  }

  @Post('/signup')
  async signupUser(@Body() body: CreateUserDto, @Session() session) {
    console.log('POST signupUser with body -->, ', body);
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

  // @Serialize(PlainUserDto) Example of how we could use the Serialize for just one route
  @Get('/:id')
  getUser(@Param('id') userId: number) {
    console.log('getUserById with id -->', userId);
    return this.usersService.getUserById(userId);
  }

  @Get()
  getUserByEmail(@Query('email') userEmail: string) {
    console.log('getUserByEmail with email -->', userEmail);
    return this.usersService.getUserByEmail(userEmail);
  }

  @Delete('/:id')
  removeUser(@Param('id') userId: number) {
    console.log('removeUSer with id -->', userId);
    return this.usersService.removeUser(userId);
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    console.log('updateUser with id --> ', userId, ' and body -->', body);
    this.usersService.updateUser(userId, body);
  }
}
