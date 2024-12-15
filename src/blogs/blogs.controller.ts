import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";

@ApiTags('Blogs')
@Controller('blogs')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Blog created successfully' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles('admin')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  @ApiOkResponse({ description: 'List of blogs' })
  @Roles('admin', 'user')
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Blog item' })
  @Roles('admin', 'user')
  findOne(@Param('id') id: number) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Blog updated successfully' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Roles('admin')
  update(@Param('id') id: number, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Blog deleted successfully' })
  @Roles('admin')
  remove(@Param('id') id: number) {
    return this.blogsService.remove(id);
  }
}