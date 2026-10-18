import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service.js';
import { CreateSpaceDto } from './dto/create-space.dto.js';
import { UpdateSpaceDto } from './dto/update-space.dto.js';

@Injectable()
export class SpacesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createSpaceDto: CreateSpaceDto) {
    const existingSpace = await this.prisma.space.findUnique({
      where: { slug: createSpaceDto.slug },
      select: { id: true },
    });

    if (existingSpace) {
      throw new ConflictException('A space with this slug already exists');
    }

    try {
      return await this.prisma.space.create({
        data: {
          ...createSpaceDto,
          userId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A space with this slug already exists');
      }

      throw error;
    }
  }

  findAllByUser(userId: string) {
    return this.prisma.space.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const space = await this.prisma.space.findFirst({
      where: { id, userId },
    });

    if (!space) {
      throw new NotFoundException(`Space with id ${id} not found`);
    }

    return space;
  }

  async update(id: string, userId: string, updateSpaceDto: UpdateSpaceDto) {
    await this.findOne(id, userId);

    if (updateSpaceDto.slug) {
      const existingSpace = await this.prisma.space.findUnique({
        where: { slug: updateSpaceDto.slug },
        select: { id: true },
      });

      if (existingSpace && existingSpace.id !== id) {
        throw new ConflictException('A space with this slug already exists');
      }
    }

    try {
      return await this.prisma.space.update({
        where: { id },
        data: updateSpaceDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('A space with this slug already exists');
      }

      throw error;
    }
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.space.delete({
      where: { id },
    });
  }
}
