import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCounterAttackDto {
  @ApiProperty({ description: 'Competitor ID' })
  @IsString()
  competitorId!: string;

  @ApiPropertyOptional({ description: 'Scan result ID that triggered this' })
  @IsOptional()
  @IsString()
  scanResultId?: string;

  @ApiProperty({
    enum: ['price_match', 'price_undercut', 'ad_campaign', 'email_campaign', 'social_post', 'discount_code'],
  })
  @IsEnum(['price_match', 'price_undercut', 'ad_campaign', 'email_campaign', 'social_post', 'discount_code'])
  type!: 'price_match' | 'price_undercut' | 'ad_campaign' | 'email_campaign' | 'social_post' | 'discount_code';

  @ApiProperty({
    enum: ['price_drop', 'price_increase', 'new_product', 'stock_out', 'new_ad', 'manual'],
  })
  @IsEnum(['price_drop', 'price_increase', 'new_product', 'stock_out', 'new_ad', 'manual'])
  triggerCondition!: 'price_drop' | 'price_increase' | 'new_product' | 'stock_out' | 'new_ad' | 'manual';

  @ApiProperty({ description: 'Counter-attack configuration' })
  @IsObject()
  config!: Record<string, unknown>;
}
