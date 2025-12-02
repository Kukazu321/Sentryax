import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';

/**
 * Clerk service for authentication operations
 */
@Injectable()
export class ClerkService {
  private readonly clerk;

  constructor(private readonly configService: ConfigService) {
    this.clerk = createClerkClient({
      secretKey: this.configService.getOrThrow<string>('CLERK_SECRET_KEY'),
    });
  }

  /**
   * Verify a JWT token from Clerk
   */
  async verifyToken(token: string) {
    const { payload } = await this.clerk.verifyToken(token);
    return payload;
  }

  /**
   * Get user details from Clerk
   */
  async getUser(userId: string) {
    return this.clerk.users.getUser(userId);
  }

  /**
   * List all users (for admin purposes)
   */
  async listUsers(limit = 10, offset = 0) {
    return this.clerk.users.getUserList({ limit, offset });
  }
}
