import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Role } from '../roles/entities/role.entity';
import { UserProfile } from "../auth/entities/user-profile.entity";
import { FindUsersDto } from "./dto/find-users.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async findAll(findUsersDto: FindUsersDto) {
    const { firstName, email, phone, isVerifiedEmail, ...rest } = findUsersDto;
    const query = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.roles', 'roles');

    if (firstName) {
      query.andWhere('profile.firstName LIKE :firstName', { firstName: `%${firstName}%`});
    }

    if (email) {
      query.andWhere('user.email LIKE :email', { email: `%${email}%` });
    }

    if (phone) {
      query.andWhere('profile.phone LIKE :phone', { phone: `%${phone}%` });
    }

    if (isVerifiedEmail) {
      query.andWhere('profile.isVerifiedEmail = :isVerifiedEmail', { isVerifiedEmail });
    }

    return query.getMany()
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserRole(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    const { roleSlug } = updateUserRoleDto;
    const user = await this.findOne(id);
    const role = await this.roleRepository.findOneBy({ slug: roleSlug });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    user.roles = [role];
    return this.userRepository.save(user)
  }


  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.delete(user.id)
  }
}