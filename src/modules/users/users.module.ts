import { Module } from '@nestjs/common';
import { CarsModule } from '../cars/cars.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CarsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
