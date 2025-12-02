import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ScansService } from './scans.service';
import { CurrentUserId } from '../../core/auth/decorators/current-user.decorator';
import { CreateScanDto } from './dto/create-scan.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('scans')
@ApiBearerAuth()
@Controller('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Get()
  @ApiOperation({ summary: 'List all scans' })
  async findAll(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationDto
  ) {
    return this.scansService.findAll(userId, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get scan by ID with results' })
  async findOne(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.scansService.findOne(userId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Trigger a new scan' })
  async create(
    @CurrentUserId() userId: string,
    @Body() createScanDto: CreateScanDto
  ) {
    return this.scansService.create(userId, createScanDto);
  }

  @Get('competitor/:competitorId')
  @ApiOperation({ summary: 'Get scans for a specific competitor' })
  async findByCompetitor(
    @CurrentUserId() userId: string,
    @Param('competitorId') competitorId: string,
    @Query() pagination: PaginationDto
  ) {
    return this.scansService.findByCompetitor(userId, competitorId, pagination);
  }
}
