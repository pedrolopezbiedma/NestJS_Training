import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PlainUserDto } from 'src/users/dto/plain-user.dto';
import { SerializePasswordInterceptor } from 'src/interceptors/serialize-password.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseInterceptors(new SerializePasswordInterceptor(PlainUserDto))
  @Post('/signup')
  signupUser(@Body() body: CreateUserDto) {
    console.log('El body es -->, ', body);
    return this.userService.signupUser(body.email, body.password);
  }

  @UseInterceptors(new SerializePasswordInterceptor(PlainUserDto))
  @Get('/:id')
  getUser(@Param('id') userId: number) {
    console.log('getUserById with id -->', userId);
    return this.userService.getUserById(userId);
  }

  @UseInterceptors(new SerializePasswordInterceptor(PlainUserDto))
  @Get()
  getUserByEmail(@Query('email') userEmail: string) {
    console.log('getUserByEmail with email -->', userEmail);
    return this.userService.getUserByEmail(userEmail);
  }

  @UseInterceptors(new SerializePasswordInterceptor(PlainUserDto))
  @Delete('/:id')
  removeUser(@Param('id') userId: number) {
    console.log('removeUSer with id -->', userId);
    return this.userService.removeUser(userId);
  }

  @UseInterceptors(new SerializePasswordInterceptor(PlainUserDto))
  @Patch('/:id')
  updateUser(@Param('id') userId: number, @Body() body: UpdateUserDto) {
    console.log('updateUser with id --> ', userId, ' and body -->', body);
    this.userService.updateUser(userId, body);
  }
}
