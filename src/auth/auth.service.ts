import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) { }

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
}

