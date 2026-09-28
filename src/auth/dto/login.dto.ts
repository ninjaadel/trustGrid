import { IsEmail, IsString, MinLength } from 'class-validator';

export class loginDto {
  @IsEmail({}, { message: 'email doğru yazın' })
  @IsString()
  email!: string;

  @IsString()
  @MinLength(8, { message: 'en az 8 rakam olmalı şifereniz' })
  password: string;
}
