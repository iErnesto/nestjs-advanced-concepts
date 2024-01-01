import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { FibonacciModule } from './fibonacci/fibonacci.module';

@Module({
  imports: [CoffeesModule, SchedulerModule, FibonacciModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
