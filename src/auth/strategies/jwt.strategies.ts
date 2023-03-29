import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interfaces";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export  class JwtStrategy extends PassportStrategy( Strategy ){
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,){
            super({
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            });
        }

    async validate(payload: JwtPayload): Promise<User>{
        const { id } = payload;
        const user = await this.userRepository.findOne({ 
            where: { 
                id : id  
            }, 
            relations: { 
                    role_ids: true
            }
        });

        if ( !user ) 
            throw new UnauthorizedException('Token not valid')
   
        if ( user.deleted_at !== null) 
            throw new UnauthorizedException('User is inactive, talk with an admin');
        return user;
    }
}