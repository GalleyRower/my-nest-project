import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  create(createBlogDto: CreateBlogDto) {
    return this.blogRepository.save(createBlogDto);
  }

  findAll() {
    return this.blogRepository.find();
  }

  findOne(id: number) {
    return this.blogRepository.findOneBy({id});
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.blogRepository.delete(id);
  }
}