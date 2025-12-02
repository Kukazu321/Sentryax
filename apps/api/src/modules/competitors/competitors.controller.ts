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
import { CompetitorsService } from './competitors.service';
import { CurrentUserId } from '../../core/auth/decorators/current-user.decorator';
import { CreateCompetitorDto } from './dto/create-competitor.dto';
import { UpdateCompetitorDto } from './dto/update-competitor.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('competitors')
@ApiBearerAuth()
@Controller('competitors')
export class CompetitorsController {
  constructor(private readonly competitorsService: CompetitorsService) {}

  @Get()
  @ApiOperation({ summary: 'List all competitors' })
  async findAll(
    @CurrentUserId() userId: string,
    @Query() pagination: PaginationDto
  ) {
    return this.competitorsService.findAll(userId, pagination);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get competitor by ID' })
  async findOne(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.competitorsService.findOne(userId, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new competitor' })
  async create(
    @CurrentUserId() userId: string,
    @Body() createCompetitorDto: CreateCompetitorDto
  ) {
    return this.competitorsService.create(userId, createCompetitorDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a competitor' })
  async update(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Body() updateCompetitorDto: UpdateCompetitorDto
  ) {
    return this.competitorsService.update(userId, id, updateCompetitorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a competitor' })
  async remove(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.competitorsService.remove(userId, id);
  }
}
