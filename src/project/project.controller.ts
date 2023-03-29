import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from 'src/auth/decorators/role-protected/role-protected.decorator';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces';

@Controller('project')
@UseGuards( AuthGuard( ) )
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard)
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
