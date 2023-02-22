import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto , LoginUserDto } from './dto/index';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'; 


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ){}

  async create(createUserDto: CreateUserDto): Promise<User>{
    try{
      const {role_ids, password, ...userData} = createUserDto
      const emailExists = await this.userRepository.findOneBy({email: userData.email});
      if(emailExists !== null) throw new HttpException(`Email address ${userData.email} already exists`, HttpStatus.BAD_REQUEST);

      const role = await this.roleRepository.findBy({id: role_ids})
      if(role.length == 0) throw new NotFoundException("The provided Role doesnt exists")
      const user = this.userRepository.create({...userData, 
                                              password: bcrypt.hashSync(password, 10), 
                                              role_ids: role});
      await this.userRepository.save(user)
      delete user.password;
      return user

    }catch(error){
      return error
    }
  }

  async login(loginUserDto: LoginUserDto){
    try{
      const {email, password} = loginUserDto
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true }
      })

      if( !user ) throw new UnauthorizedException("Incorrect email or password")

      if( !bcrypt.compareSync(password, user.password) ) throw new UnauthorizedException("Incorrect  email or password")
      
      return user;
    }catch(error){
      return error
    }
  }
}
