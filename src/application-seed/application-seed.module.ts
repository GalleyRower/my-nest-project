import { Module } from '@nestjs/common';
import { ApplicationSeedService } from './application-seed.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationCategory } from '../application/entities/application-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationCategory])],
  providers: [ApplicationSeedService],
})
export class ApplicationSeedModule {}