// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JWTModule } from "../jwt/jwt.module";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import {RolesModule} from "../roles/roles.module";


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JWTModule,
    ConfigModule,
    RolesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}