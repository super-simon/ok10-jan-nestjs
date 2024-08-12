import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, CarsModule],
})
export class AppModule {}
