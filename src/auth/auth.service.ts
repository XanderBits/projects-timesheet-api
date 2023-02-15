import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';


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
      const {role_ids, ...userData} = createUserDto
      const emailExists = await this.userRepository.findOneBy({email: userData.email});
      if(emailExists !== null) throw new HttpException(`Email address ${userData.email} already exists`, HttpStatus.BAD_REQUEST);

      const role = await this.roleRepository.findBy({id: role_ids})
      if(role.length == 0) throw new NotFoundException("The provided Role doesnt exists")
      const user = this.userRepository.create(userData);
      user.role_ids = role
      return await this.userRepository.save(user);
    }
    catch(error){
      return error
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
