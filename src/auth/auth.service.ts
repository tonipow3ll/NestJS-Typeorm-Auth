import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
    ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new HttpException('Unauthorized - Incorrect email or password', HttpStatus.UNAUTHORIZED);
    else if (user) {
      const valid = await bcrypt.compare(pass, user.password);

      if (valid) return user;
      else throw new HttpException('Unauthorized - Incorrect email or password', HttpStatus.UNAUTHORIZED)
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}

