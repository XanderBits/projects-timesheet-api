import { IsEmail, IsEnum, IsNumber, IsString, IsUUID, Matches, MaxLength, MinLength } from "class-validator";
import { UserType } from "../entities/user.entity"

export class CreateUserDto{
    @IsString()
    @MinLength(2)
    name: string;

    @IsString()
    @MinLength(2)
    lastname: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(19)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsEnum(UserType)
    user_type: UserType;

    @IsUUID()
    role_ids: string;
}