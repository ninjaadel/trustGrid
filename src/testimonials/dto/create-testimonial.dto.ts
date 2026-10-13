import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  @MinLength(2)
  authorName: string;

  @IsString()
  @MinLength(10)
  content: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  authorAvatar?: string;
}
