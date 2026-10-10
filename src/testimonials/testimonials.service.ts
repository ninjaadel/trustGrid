import { Injectable } from '@nestjs/common';
import { CreateTestimonialDto } from './dto/create-testimonial.dto.js';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto.js';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createTestimonialDto: CreateTestimonialDto) {
    const create = await this.prisma.testiMonials.create({
      data: { authorName: CreateTestimonialDto.name },
    });
  }

  findAll() {
    return `This action returns all testimonials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testimonial`;
  }

  update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    return `This action updates a #${id} testimonial`;
  }

  remove(id: number) {
    return `This action removes a #${id} testimonial`;
  }
}
