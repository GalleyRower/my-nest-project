import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../auth/entities/user.entity";
import { Role } from "../roles/entities/role.entity";
import { UserProfile } from "../auth/entities/user-profile.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserProfile])],
  controllers: [AdminController],
  providers: [UserService]
})
export class AdminModule {}