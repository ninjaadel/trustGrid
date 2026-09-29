import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async Register(dto: RegisterDto) {
    const { email, username, password, confirmPassword } = dto;

    if (password !== confirmPassword) {
      throw new BadRequestException('şifreler uyuşmuyor');
    }
    const exists = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (exists) {
      throw new ConflictException('aynı email kullanılmaktadır');
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await this.prisma.user.create({
      data: { email, password: hash, username },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return result;
  }

  async login(dto: loginDto) {
    const { email, password } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new ForbiddenException('böyle bir emeail kayıtlı değildir');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('email veya şifre doğru değildir');
    }

    const { password: _, ...unAuthorizatedUser } = user;
    return user;
  }
}
