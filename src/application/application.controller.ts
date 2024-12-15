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
  Request
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from "../roles/roles.decorator";
import { RolesGuard } from "../roles/roles.guard";

@ApiTags('Applications')
@Controller('applications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Application created successfully' })
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createApplicationDto: CreateApplicationDto, @Request() req) {
    return this.applicationService.create(createApplicationDto, req.user);
  }

  @Get()
  @ApiOkResponse({ description: 'List of applications' })
  findAll(@Request() req) {
    const { roles } = req.user;
    if (roles.includes('admin')) {
      return this.applicationService.findAll(req.user, 'admin')
    }
    return this.applicationService.findAll(req.user);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Application item' })
  findOne(@Param('id') id: number, @Request() req) {
    const { roles } = req.user;
    if (roles.includes('admin')) {
      return this.applicationService.findOne(id, req.user, 'admin');
    }
    return this.applicationService.findOne(id, req.user);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Application updated successfully' })
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @Request() req,
  ) {
    const { roles } = req.user;
    return this.applicationService.update(id, updateApplicationDto, req.user, roles.includes('admin') ? 'admin' : undefined)
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Application deleted successfully' })
  remove(@Param('id') id: number, @Request() req) {
    const { roles } = req.user;
    return this.applicationService.remove(id, req.user, roles.includes('admin') ? 'admin' : undefined);
  }
}