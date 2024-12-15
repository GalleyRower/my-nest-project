import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { CategoriesModule } from './categories/categories.module';
import { ApplicationModule } from './application/application.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RolesModule } from './roles/roles.module';
import { SeedModule } from './seed/seed.module';
import { ApplicationSeedModule } from './application-seed/application-seed.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    AuthModule,
    BlogsModule,
    CategoriesModule,
    ApplicationModule,
    RolesModule,
    SeedModule,
    ApplicationSeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}