import { IsEnum, IsOptional, IsString } from "class-validator";
import { AllowedStatus } from "../entities/project.entity";

export class CreateProjectDto {

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
    
    @IsOptional()
    @IsEnum(AllowedStatus)
    status: AllowedStatus

}
