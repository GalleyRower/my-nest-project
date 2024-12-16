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
import { RoleSeedModule } from './role-seed/role-seed.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      }
    }),
    AuthModule,
    BlogsModule,
    CategoriesModule,
    ApplicationModule,
    RolesModule,
    SeedModule,
    ApplicationSeedModule,
    RoleSeedModule,
    AdminModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}