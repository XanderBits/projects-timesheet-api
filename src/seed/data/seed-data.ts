import { UserType } from "src/auth/entities/user.entity"
import { CreateRoleDto } from "src/role/dto/create-role.dto"
import { config } from 'dotenv';

config();

interface UserData {
    name: string
    lastname: string
    email: string
    password: string
    user_type: UserType
}

interface SeedData {
    users: UserData
    roles: CreateRoleDto
}

export const initialData: SeedData = {
    users: 
        {
             name: 'ROOT',
             lastname: 'USER',
             email: process.env.ROOT_EMAIL,
             password: process.env.ROOT_PASSWORD,
             user_type: 0
        },
    roles: {
        name: 'admin'
    }
}