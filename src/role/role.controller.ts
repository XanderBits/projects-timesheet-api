import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { ValidRoles } from 'src/auth/interfaces';
import { RoleProtected } from 'src/auth/decorators/role-protected/role-protected.decorator';

@Controller('role')
@UseGuards( AuthGuard( ) )
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard)
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(UserRoleGuard)
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
