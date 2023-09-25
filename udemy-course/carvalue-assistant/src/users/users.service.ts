import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  signupUser(email: string, password: string) {
    const newUser = this.repo.create({ email, password });
    return this.repo.save(newUser);
  }

  getUserById(userId: number) {
    return this.repo.findOneBy({ id: userId });
  }

  getUserByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  async updateUser(userId: number, attributes: Partial<User>) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User with Id: ' + userId + ' not found');
    }
    Object.assign(user, attributes);
    return this.repo.save(user);
  }

  async removeUser(userId: number) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new NotFoundException('User with Id: ' + userId + ' not found');
    }

    return this.repo.remove(user);
  }
}
