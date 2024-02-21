import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/interfaces/dto';
import { IUser } from 'src/interfaces/user';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
// handles incoming req's / outbound responses
// validate req body, extract query params
export class UsersController {

  constructor(private readonly userService: UsersService) { }
  @Get()
  async findAllUsers(): Promise<IUser[]> {
    return await this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id): Promise<IUser> {
    return await this.userService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    console.log('creating!')
    return await this.userService.create(createUserDto)
  }

  @Patch(':id')
  async update(@Body() updateUserDto: CreateUserDto, @Param('id', ParseIntPipe) id: number) {
    await this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }
}
