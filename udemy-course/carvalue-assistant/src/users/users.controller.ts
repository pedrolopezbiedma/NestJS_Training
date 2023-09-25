import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  signupUser(@Body() body: CreateUserDto) {
    console.log('El body es -->, ', body);
    return this.userService.signupUser(body.email, body.password);
  }

  @Get('/:id')
  getUser(@Param('id') userId: number) {
    console.log('getUserById con id -->', userId);
    return this.userService.getUserById(userId);
  }

  @Get()
  getUserByEmail(@Query('email') userEmail: string) {
    console.log('getUserByEmail con email -->', userEmail);
    return this.userService.getUserByEmail(userEmail);
  }
}
