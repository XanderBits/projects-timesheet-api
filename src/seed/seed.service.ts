import { Injectable } from '@nestjs/common';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { initialData } from './data/seed-data';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly roleService: RoleService,
    private readonly AuthService: AuthService,  
  ) {}

  async runSeed() {
    const role = await this.insertRoles();
    await this.insertUsers(role);
    return 'SEED EXECUTED'
  }

  private async insertRoles() {
    const seedRoles = initialData.roles;
    const dbRoles = await this.roleService.create( seedRoles );
    return dbRoles;
  }

  private async insertUsers(role: Role){
    const userData = {
      name: initialData.users.name,
      lastname: initialData.users.lastname,
      email: initialData.users.email,
      password: initialData.users.password,
      user_type: initialData.users.user_type,
      role_ids: role.id,
    }
    const dbUser = await this.AuthService.create(userData);
    return dbUser
  }
}