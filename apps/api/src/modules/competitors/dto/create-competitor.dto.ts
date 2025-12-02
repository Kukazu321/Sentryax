import { IsString, IsOptional, IsUrl, IsEnum, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCompetitorDto {
  @ApiProperty({ example: 'Competitor Store' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'competitor.com' })
  @IsString()
  domain!: string;

  @ApiPropertyOptional({ example: 'https://competitor.myshopify.com' })
  @IsOptional()
  @IsUrl()
  shopifyStoreUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({ enum: ['direct', 'indirect', 'aspirational'] })
  @IsOptional()
  @IsEnum(['direct', 'indirect', 'aspirational'])
  type?: 'direct' | 'indirect' | 'aspirational';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}
