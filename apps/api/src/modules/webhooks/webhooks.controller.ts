import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Headers,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { WebhooksService } from './webhooks.service';
import { CurrentUserId } from '../../core/auth/decorators/current-user.decorator';
import { Public } from '../../core/auth/decorators/public.decorator';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@ApiTags('webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all webhooks' })
  async findAll(@CurrentUserId() userId: string) {
    return this.webhooksService.findAll(userId);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new webhook' })
  async create(
    @CurrentUserId() userId: string,
    @Body() createWebhookDto: CreateWebhookDto
  ) {
    return this.webhooksService.create(userId, createWebhookDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a webhook' })
  async update(
    @CurrentUserId() userId: string,
    @Param('id') id: string,
    @Body() updateWebhookDto: UpdateWebhookDto
  ) {
    return this.webhooksService.update(userId, id, updateWebhookDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a webhook' })
  async remove(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.webhooksService.remove(userId, id);
  }

  // Incoming webhook endpoint (for Clerk, Stripe, etc.)
  @Post('incoming/:provider')
  @Public()
  @ApiOperation({ summary: 'Handle incoming webhooks from providers' })
  async handleIncoming(
    @Param('provider') provider: string,
    @Headers('x-webhook-signature') signature: string,
    @Req() req: RawBodyRequest<Request>
  ) {
    return this.webhooksService.handleIncoming(provider, signature, req.rawBody);
  }
}
