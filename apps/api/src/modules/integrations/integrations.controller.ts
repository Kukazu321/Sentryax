import { Controller, Get, Post, Delete, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';
import { CurrentUserId } from '../../core/auth/decorators/current-user.decorator';

@ApiTags('integrations')
@ApiBearerAuth()
@Controller('integrations')
export class IntegrationsController {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Get()
  @ApiOperation({ summary: 'List all integrations' })
  async findAll(@CurrentUserId() userId: string) {
    return this.integrationsService.findAll(userId);
  }

  @Get(':type/connect')
  @ApiOperation({ summary: 'Get OAuth URL for integration' })
  async getConnectUrl(
    @CurrentUserId() userId: string,
    @Param('type') type: string,
    @Query('redirectUrl') redirectUrl: string
  ) {
    return this.integrationsService.getConnectUrl(userId, type, redirectUrl);
  }

  @Get(':type/callback')
  @ApiOperation({ summary: 'OAuth callback handler' })
  async handleCallback(
    @Param('type') type: string,
    @Query('code') code: string,
    @Query('state') state: string
  ) {
    return this.integrationsService.handleCallback(type, code, state);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Disconnect an integration' })
  async disconnect(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.integrationsService.disconnect(userId, id);
  }
}
