import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateTestimonialDto } from './dto/create-testimonial.dto.js';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto.js';

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTestimonialDto: CreateTestimonialDto) {
    return this.prisma.testiMonials.create({
      data: createTestimonialDto,
    });
  }

  async findAll() {
    return this.prisma.testiMonials.findMany({
      orderBy: { authorName: 'asc' },
    });
  }

  async findOne(id: string) {
    const testimonial = await this.prisma.testiMonials.findUnique({
      where: { id },
    });

    if (!testimonial) {
      throw new NotFoundException(`Testimonial with id ${id} not found`);
    }

    return testimonial;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
    await this.findOne(id);

    return this.prisma.testiMonials.update({
      where: { id },
      data: updateTestimonialDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.testiMonials.delete({
      where: { id },
    });
  }
}
