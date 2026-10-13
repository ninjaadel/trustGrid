import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { TestimonialsController } from './testimonials.controller.js';
import { TestimonialsService } from './testimonials.service.js';

@Module({
  controllers: [TestimonialsController],
  providers: [TestimonialsService, PrismaService],
})
export class TestimonialsModule {}
