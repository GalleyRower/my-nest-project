import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {RolesGuard} from "../roles/roles.guard";
import {Roles} from "../roles/roles.decorator";

@ApiTags('Categories')
@Controller('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOkResponse({ description: 'List of categories' })
  @Roles('admin', 'user')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Category item' })
  @Roles('admin', 'user')
  findOne(@Param('id') id: number) {
    return this.categoriesService.findOne(id);
  }
}