import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Role } from 'src/role/entities/role.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [TypeOrmModule.forFeature([ User, Project, Role])],
  exports: [TypeOrmModule]
})
export class AuthModule {}
