import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshTokenStrategy, UsersService,],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule, 
    JwtModule.register({
      secret: jwtConstants.accessSecret,
      signOptions: { expiresIn: '60s'}
    })
  ],
  exports: [AuthService]
})
export class AuthModule {}
