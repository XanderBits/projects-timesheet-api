import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { RoleModule } from 'src/role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';


@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports:[
    RoleModule,
    TypeOrmModule.forFeature([Role]) 
  ]
})
export class SeedModule {}
