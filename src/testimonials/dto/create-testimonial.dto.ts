import { IsString } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  spaceId: string;
  content: string;
  authorName: string;
}
