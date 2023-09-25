import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UsersService) {}

  async handleSignup(email: string, password: string) {
    await this.checkEmailExisting(email);
    const encryptedPassword = await this.encryptPassword(password);

    return this.userService.signupUser(email, encryptedPassword);
  }

  private async checkEmailExisting(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (user.length > 0) {
      throw new BadRequestException('Email already being used.');
    }
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
}
