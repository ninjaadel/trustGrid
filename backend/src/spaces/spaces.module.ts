import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { SpacesService } from './spaces.service.js';
import { SpacesController } from './spaces.controller.js';

@Module({
  controllers: [SpacesController],
  providers: [SpacesService, PrismaService],
})
export class SpacesModule {}
