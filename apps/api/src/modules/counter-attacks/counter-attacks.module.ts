import { Module } from '@nestjs/common';
import { CounterAttacksController } from './counter-attacks.controller';
import { CounterAttacksService } from './counter-attacks.service';

@Module({
  controllers: [CounterAttacksController],
  providers: [CounterAttacksService],
  exports: [CounterAttacksService],
})
export class CounterAttacksModule {}
