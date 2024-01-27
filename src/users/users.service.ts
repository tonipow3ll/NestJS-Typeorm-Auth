import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUser } from 'src/interfaces/user';
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

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(user: UserParams) {
    const newUser = this.usersRepository.create({ ...user });
    return this.usersRepository.save(newUser)
  }

  async update(id: number, updatedUserDetails: UserParams) {
    return this.usersRepository.update({ id }, { ...updatedUserDetails });
    // return this.usersRepository.save(updatedUser);
  }

  async delete(id: number) {
    return this.usersRepository.delete({ id });
  }
}