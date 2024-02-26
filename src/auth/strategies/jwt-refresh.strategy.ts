import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.accessSecret,
    });
  }
  
  async validate(payload: any) {
    console.log('validate in refresh')
    return { id: payload.sub, username: payload.email }

  }

  // validate(req: Request, payload: any) {
  //   const refreshToken = req.get('Authorization').replace('Bearer', '').trim()
  //   return { ...payload, refreshToken }
  // }
}