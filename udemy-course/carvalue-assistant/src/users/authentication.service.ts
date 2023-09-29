import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { User } from './user.entity';

@Injectable()
export class AuthenticationService {
  constructor(private usersService: UsersService) {}

  async handleSignup(email: string, password: string) {
    const user = await this.checkEmailExisting(email);
    const encryptedPassword = await this.encryptPassword(password);

    return this.usersService.signupUser(email, encryptedPassword);
  }

  async handleSignin(email: string, password: string) {
    const user = await this.checkEmailNotExisting(email);
    const [salt, storedHash] = user.password.split('.');

    const decryptedPassword = await this.decryptPassword(password, salt);
    if (storedHash !== decryptedPassword) {
      throw new BadRequestException('Wrong credentials');
    }

    return user;
  }

  private async checkEmailExisting(email: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);
    if (user.length > 0) {
      throw new BadRequestException('Email already being used.');
    }
    return user[0];
  }

  private async checkEmailNotExisting(email: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (user.length === 0) {
      throw new NotFoundException('There is no user with that email.');
    }
    return user[0];
  }

  private async encryptPassword(password: string): Promise<string> {
    // Make scrypt to return promises to better deal with this.
    const scrypt = promisify(_scrypt);

    // Encrypt the password
    const salt = randomBytes(8).toString('hex');
    const hashPassword = (await scrypt(password, salt, 32)) as Buffer;
    const encryptedPassword = salt + '.' + hashPassword.toString('hex');

    return encryptedPassword;
  }

  private async decryptPassword(password: string, salt: string) {
    const scrypt = promisify(_scrypt);
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    return hash.toString('hex');
  }
}
