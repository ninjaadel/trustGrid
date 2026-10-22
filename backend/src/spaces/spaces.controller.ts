import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { SpacesService } from './spaces.service.js';
import { CreateSpaceDto } from './dto/create-space.dto.js';
import { UpdateSpaceDto } from './dto/update-space.dto.js';

interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
  };
}

@Controller('spaces')
@UseGuards(AuthGuard('jwt'))
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  create(
    @Req() request: AuthenticatedRequest,
    @Body() createSpaceDto: CreateSpaceDto,
  ) {
    return this.spacesService.create(request.user.userId, createSpaceDto);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest) {
    return this.spacesService.findAllByUser(request.user.userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.spacesService.findOne(id, request.user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() request: AuthenticatedRequest,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    return this.spacesService.update(
      id,
      request.user.userId,
      updateSpaceDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.spacesService.remove(id, request.user.userId);
  }
}
