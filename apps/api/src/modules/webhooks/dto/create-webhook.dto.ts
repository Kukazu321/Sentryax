import { IsString, IsUrl, IsEnum, IsArray, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWebhookDto {
  @ApiProperty({ example: 'My Webhook' })
  @IsString()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 'https://example.com/webhook' })
  @IsUrl()
  url!: string;

  @ApiProperty({ enum: ['incoming', 'outgoing'] })
  @IsEnum(['incoming', 'outgoing'])
  direction!: 'incoming' | 'outgoing';

  @ApiProperty({
    type: [String],
    example: ['scan.completed', 'change.detected'],
  })
  @IsArray()
  @IsString({ each: true })
  events!: string[];
}
