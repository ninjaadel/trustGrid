import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';

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
    });

    return result;
  }
}
