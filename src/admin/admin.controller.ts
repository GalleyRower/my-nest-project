import {
  Controller,
  Get,
  Param,
  Delete,
  UseGuards,
  Patch,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';
import { UserService } from './user.service';
import {UpdateUserRoleDto} from "./dto/update-user-role.dto";
import { User } from "../auth/entities/user.entity";
import { FindUsersDto } from "./dto/find-users.dto";

@ApiTags('Admin')
@Controller('admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @ApiOkResponse({ description: 'List of users with profiles' })
  getAllUsers(@Query() findUsersDto: FindUsersDto) {
    return this.userService.findAll(findUsersDto);
  }

  @Get('users/:id')
  @ApiOkResponse({ description: 'User with profile' })
  getUser(@Param('id') id: number) {
    return this.userService.findOne(id);
  }


  @Patch('users/:id/role')
  @ApiOkResponse({ description: 'Update user role' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUserRole(@Param('id') id: number, @Body() updateUserRoleDto: UpdateUserRoleDto) {
    return this.userService.updateUserRole(id, updateUserRoleDto);
  }

  @Delete('users/:id')
  @ApiOkResponse({ description: 'User deleted' })
  removeUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}