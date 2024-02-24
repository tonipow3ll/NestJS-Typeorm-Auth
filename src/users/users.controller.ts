import { Controller, Get, Post, Put, Body, Param, ParseIntPipe, Patch, Delete, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/interfaces/create-user.dto';
import { IUser } from 'src/interfaces/user';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from 'src/interfaces/update-user.dto';

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

  // signup
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    console.log('creating!')
    return await this.userService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() updateUserDto: UpdateUserDto, @Param('id', ParseIntPipe) id: number) {
    await this.userService.update(id, updateUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.userService.delete(id);
  }
}
