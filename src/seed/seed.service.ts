import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(
    private readonly roleService: RoleService,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async runSeed() {
    await this.deleteAllTables();
    await this.insertRoles();
    return 'test';
  }

  private async insertRoles() {
    const seedRoles = initialData.role;

    const roles: Role[] = [];

    seedRoles.forEach((role) => {
      roles.push(this.roleRepository.create(role));
    });

    const dbRoles = await this.roleRepository.save(roles);

    return dbRoles[0];
  }

  private async deleteAllTables() {
    await this.roleService.deleteAllRoles();

    // const queryBuilder = this.roleRepository.createQueryBuilder();

    // await queryBuilder.delete().where({}).execute();
  }
}
