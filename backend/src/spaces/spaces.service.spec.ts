import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { SpacesService } from './spaces.service.js';

describe('SpacesService', () => {
  let service: SpacesService;
  const prisma = {
    space: {
      create: vi.fn(),
      findFirst: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpacesService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<SpacesService>(SpacesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a space for the authenticated user', async () => {
    const dto = { name: 'My Course', slug: 'my-course' };
    prisma.space.findUnique.mockResolvedValue(null);
    prisma.space.create.mockResolvedValue({ id: 'space-id', ...dto });

    await service.create('user-id', dto);

    expect(prisma.space.create).toHaveBeenCalledWith({
      data: { ...dto, userId: 'user-id' },
    });
  });

  it('rejects a duplicate slug', async () => {
    prisma.space.findUnique.mockResolvedValue({ id: 'existing-space' });

    await expect(
      service.create('user-id', { name: 'My Course', slug: 'my-course' }),
    ).rejects.toBeInstanceOf(ConflictException);

    expect(prisma.space.create).not.toHaveBeenCalled();
  });

  it('does not return a space owned by another user', async () => {
    prisma.space.findFirst.mockResolvedValue(null);

    await expect(service.findOne('space-id', 'user-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(prisma.space.findFirst).toHaveBeenCalledWith({
      where: { id: 'space-id', userId: 'user-id' },
    });
  });
});
