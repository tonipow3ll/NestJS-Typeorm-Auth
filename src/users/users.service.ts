import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserParams } from 'src/interfaces/user.params';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// business logic
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: UserParams) {
    const foundUser = await this.usersRepository.findOneBy({ email: user.email });
    if (!foundUser) {
      const newUser = this.usersRepository.create({ ...user });
      return this.usersRepository.save(newUser);
    }
    else throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  async update(id: number, updatedUserDetails: UserParams) {
    return this.usersRepository.update({ id }, { ...updatedUserDetails });
  }

  async delete(id: number) {
    return this.usersRepository.delete({ id });
  }
}