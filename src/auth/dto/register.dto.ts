import { ArgsType, Field } from "@nestjs/graphql";
import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength} from "class-validator";

@ArgsType()
export class RegisterDto{

    @Field()
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @Field()
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    apellidos: string;

    @Field()
    @IsEmail()
    email : string; 

    @Field()
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
    
}