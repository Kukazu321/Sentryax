import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScanDto {
  @ApiProperty({ description: 'Competitor ID to scan' })
  @IsString()
  competitorId!: string;

  @ApiProperty({
    enum: ['full', 'incremental', 'products', 'pricing', 'ads', 'social'],
    description: 'Type of scan to perform',
  })
  @IsEnum(['full', 'incremental', 'products', 'pricing', 'ads', 'social'])
  type!: 'full' | 'incremental' | 'products' | 'pricing' | 'ads' | 'social';
}
