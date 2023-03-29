import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      const role = this.roleRepository.create(createRoleDto);
      await this.roleRepository.save(role);

      return role;
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    const roles = await this.roleRepository.find();
    return roles;
  }

  async findOne(id: string) {
    let role: Role;

    if (isUUID(id)) {
      role = await this.roleRepository.findOne({ where: { id: id } });
    }

    if (!role) throw new BadRequestException(`role with ID ${id} not found`);

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.preload({
      id: id,
      ...updateRoleDto,
    });

    if (!role) throw new BadRequestException(`role with ID ${id} not found`);
    
    try {
      await this.roleRepository.save(role);
      return role;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(`Please check server logs`);
  }


  async deleteAllRoles(){

    const query = this.roleRepository.createQueryBuilder('product');

    try {
      return await query
        .delete()
        .where({})
        .execute();

    } catch (error) {

      this.handleDBErrors(error)
    }
  }
}
