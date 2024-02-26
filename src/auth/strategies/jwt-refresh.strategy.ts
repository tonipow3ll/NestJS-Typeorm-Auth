import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor() {
    super({
      // NOTE - could use extractFromHeaders here, or body. Same as the jwt.strategy.
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.accessSecret,
    });
  }
  
  async validate(payload: any) {
    console.log('validate in refresh')
    return { id: payload.sub, username: payload.email }

  }
}