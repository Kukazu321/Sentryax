import { PartialType } from '@nestjs/swagger';
import { CreateWebhookDto } from './create-webhook.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateWebhookDto extends PartialType(CreateWebhookDto) {
  @ApiPropertyOptional({ enum: ['active', 'inactive'] })
  @IsOptional()
  @IsEnum(['active', 'inactive'])
  status?: 'active' | 'inactive';
}
