import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../../prisma/prisma.service.js';
@Injectable()
export class JwtStrategies extends PassportStrategy(strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_SECRET,
    });
  }
  async validate(payload: any) {
    console.log('jwt çalışıyor');

    if (!payload && !payload.sub) {
      console.log('Jwt hatası : payload.sub yok', payload);
      throw new UnauthorizedException('invalid token payload');
    }

    const user: any = {
      userId: payload.sub,
    };
    return user;
  }
}
