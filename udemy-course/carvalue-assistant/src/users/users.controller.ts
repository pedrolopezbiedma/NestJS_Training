import { Body, Controller, Post } from '@nestjs/common';
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
}
