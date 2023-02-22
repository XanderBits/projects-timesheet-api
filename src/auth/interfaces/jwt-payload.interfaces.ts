import { UserType } from "../entities/user.entity";

export interface JwtPayload{
    id: string;
    name: string;
    lastname: string; 
    user_type: UserType;
}