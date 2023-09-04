import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  @Post('/signup')
  signupUser(@Body() body: CreateUserDto) {
    return console.log('El body es -->, ', body);
  }
}
