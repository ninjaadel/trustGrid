import {
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'slug must contain lowercase letters, numbers, and single hyphens only',
  })
  slug!: string;

  @IsOptional()
  @IsString()
  headerTitle?: string;

  @IsOptional()
  @IsString()
  customMessage?: string;

  @IsString
}
