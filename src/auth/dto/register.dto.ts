import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
export class RegisterDto {
  @IsEmail({}, { message: 'email kriterlere uygun yazın' })
  @IsString()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'kullancı adı en az iiki harfli olmalı' })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'en az 8 rakam olmalı şifereniz' })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
