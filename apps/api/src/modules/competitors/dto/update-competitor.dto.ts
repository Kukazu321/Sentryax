import { PartialType } from '@nestjs/swagger';
import { CreateCompetitorDto } from './create-competitor.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompetitorDto extends PartialType(CreateCompetitorDto) {
  @ApiPropertyOptional({ enum: ['active', 'paused', 'archived'] })
  @IsOptional()
  @IsEnum(['active', 'paused', 'archived'])
  status?: 'active' | 'paused' | 'archived';
}
