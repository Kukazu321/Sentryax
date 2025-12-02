import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CounterAttacksService } from './counter-attacks.service';
import { CurrentUserId } from '../../core/auth/decorators/current-user.decorator';
import { CreateCounterAttackDto } from './dto/create-counter-attack.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('counter-attacks')
@ApiBearerAuth()
@Controller('counter-attacks')
export class CounterAttacksController {
  constructor(private readonly counterAttacksService: CounterAttacksService) {}

  @Get()
  @ApiOperation({ summary: 'List all counter-attacks' })
  async findAll(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationDto
  ) {
    return this.counterAttacksService.findAll(userId, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get counter-attack by ID' })
  async findOne(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.counterAttacksService.findOne(userId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new counter-attack' })
  async create(
    @CurrentUserId() userId: string,
    @Body() createDto: CreateCounterAttackDto
  ) {
    return this.counterAttacksService.create(userId, createDto);
  }

  @Patch(':id/approve')
  @ApiOperation({ summary: 'Approve a pending counter-attack' })
  async approve(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.counterAttacksService.approve(userId, id);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a counter-attack' })
  async cancel(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.counterAttacksService.cancel(userId, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a counter-attack' })
  async remove(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.counterAttacksService.remove(userId, id);
  }
}
