import { IsEmail } from 'class-validator';

export class CreateSpaceDto {
  @IsEmail()
  email?: string;
}
