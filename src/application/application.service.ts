import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApplicationCategory } from "./entities/application-category.entity";
import { User } from "../auth/entities/user.entity";
import { Roles } from "../roles/roles.decorator";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>,
    @InjectRepository(ApplicationCategory)
    private applicationCategoryRepository: Repository<ApplicationCategory>,
    private authService: AuthService
  ) {}

  async create(createApplicationDto: CreateApplicationDto, user: User) {
    const { categoryIds, ...applicationData } = createApplicationDto;
    const categories = await this.applicationCategoryRepository.find({
      where: { id: categoryIds },
    });

    const application = this.applicationRepository.create({
      ...applicationData,
      user: user,
      categories,
    });

    return this.applicationRepository.save(application);
  }

  async findAll(user: User, role?: string) {
    if (role === 'admin') {
      return this.applicationRepository.find({
        relations: ['user', 'categories'],
      });
    }
    return this.applicationRepository.find({ where: { user }, relations: ['user', 'categories'] });
  }

  async findOne(id: number, user: User, role?: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['user', 'categories'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (role === 'admin') return application;

    if (application.user.id !== user.id) {
      throw new NotFoundException('Application not found');
    }

    return application;
  }

  async update(id: number, updateApplicationDto: UpdateApplicationDto, user: User, role?: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['user']
    })
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if(role !== 'admin' && application.user.id !== user.id) {
      throw new NotFoundException('Application not found');
    }

    const { categoryIds, ...applicationData } = updateApplicationDto;
    const categories = categoryIds ? await this.applicationCategoryRepository.find({
      where: { id: categoryIds },
    }) : application.categories;

    await this.applicationRepository.update(id, {
      ...applicationData,
      categories
    });
    return this.applicationRepository.findOne({ where: {id}, relations: ['categories']});
  }

  async remove(id: number, user: User, role?: string) {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if(role !== 'admin' && application.user.id !== user.id) {
      throw new NotFoundException('Application not found');
    }
    await this.applicationRepository.delete(id);
  }
}