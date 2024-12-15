import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    await this.seedCategories();
  }

  async seedCategories() {
    const categories = [
      { name: 'Technology' },
      { name: 'Travel' },
      { name: 'Food' },
      { name: 'Fashion' },
      { name: 'Health' },
      { name: 'Lifestyle' },
      { name: 'Business' },
      { name: 'Sports' },
      { name: 'Education' },
      { name: 'Entertainment' },
    ];

    for (const category of categories) {
      const existCategory = await this.categoryRepository.findOneBy({ name: category.name });

      if (!existCategory) {
        await this.categoryRepository.save(category);
      }
    }
  }
}