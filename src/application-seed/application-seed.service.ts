import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationCategory } from '../application/entities/application-category.entity';

@Injectable()
export class ApplicationSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(ApplicationCategory)
    private applicationCategoryRepository: Repository<ApplicationCategory>,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
  }

  async seedCategories() {
    const categories = [
      { name: 'Дом' },
      { name: 'Гараж' },
      { name: 'Сарай' },
      { name: 'Пруд' },
      { name: 'Баня' },
      { name: 'Летний душ' },
      { name: 'Беседка' },
      { name: 'Детская площадка' },
      { name: 'Забор' },
      { name: 'Огород' },
    ];

    for (const category of categories) {
      const existCategory = await this.applicationCategoryRepository.findOneBy({
        name: category.name,
      });

      if (!existCategory) {
        await this.applicationCategoryRepository.save(category);
      }
    }
  }
}