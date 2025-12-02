import { Controller, Get, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CurrentUserId } from '../../core/auth/decorators/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  async getMe(@CurrentUserId() userId: string) {
    return this.usersService.findByClerkId(userId);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  async updateMe(
    @CurrentUserId() userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.updateByClerkId(userId, updateUserDto);
  }

  @Get('me/settings')
  @ApiOperation({ summary: 'Get current user settings' })
  async getSettings(@CurrentUserId() userId: string) {
    return this.usersService.getSettings(userId);
  }
}
