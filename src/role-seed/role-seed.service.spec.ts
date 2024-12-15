import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  async seedRoles() {
    const roles = [
      { slug: 'admin' },
      { slug: 'user' },
    ];

    for (const role of roles) {
      const existRole = await this.roleRepository.findOneBy({ slug: role.slug });

      if (!existRole) {
        await this.roleRepository.save(role);
      }
    }
  }
}

