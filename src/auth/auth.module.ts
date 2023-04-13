import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Project } from 'src/project/entities/project.entity';
import { Role } from 'src/role/entities/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
            TypeOrmModule.forFeature([ User, Project, Role ]),
            PassportModule.register( { defaultStrategy: 'jwt' } ),
            JwtModule.registerAsync({
              useFactory: () => { 
                return {
                  secret: process.env.JWT_SECRET,
                  signOptions: {
                    expiresIn: '3h'
                  }
                }
              }
            })
  ],
  exports: [TypeOrmModule, JwtStrategy, PassportModule, JwtModule, AuthService]
})
export class AuthModule {}
