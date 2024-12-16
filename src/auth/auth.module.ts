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
import { UserProfile } from "./entities/user-profile.entity";
import { UserProfileService } from "./user-profile.service";
import { UserProfileController } from "./user-profile.controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile]),
    PassportModule,
    JWTModule,
    ConfigModule,
    RolesModule
  ],
  controllers: [AuthController, UserProfileController],
  providers: [AuthService, JwtStrategy, UserProfileService],
  exports: [AuthService],
})
export class AuthModule {}