import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('/register')
  async Register(@Body() dto: RegisterDto) {
    return this.AuthService.Register(dto);
  }

  @Post('/login')
  async Login(@Body() dto: RegisterDto) {
    return this.AuthService.login(dto);
  }
}
