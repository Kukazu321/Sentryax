import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

/**
 * Health check endpoints for monitoring
 */
@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Basic health check' })
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness check for Kubernetes' })
  ready() {
    // Add database/redis connectivity checks here
    return {
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }
}
