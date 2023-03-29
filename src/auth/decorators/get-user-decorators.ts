import { BadRequestException, ExecutionContext, InternalServerErrorException } from "@nestjs/common";
import { createParamDecorator } from "@nestjs/common/decorators";
import { User } from "../entities/user.entity";

export const GetUser = createParamDecorator( 
    ( data: string, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest();
        const user = req.user as User

        if ( !user )
            throw new BadRequestException('User not found');
        
            for (const role of user.role_ids ) {
                console.log(role)
              }
    }
); 