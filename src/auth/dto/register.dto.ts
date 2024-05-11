import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsDate} from "class-validator";

export class RegisterDto{

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    name: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(1)
    apellidos: string;

    @Transform(({ value }) => new Date(value), { toClassOnly: true })
    @IsDate() 
    nacimiento: string;

    @IsEmail()
    email : string; 

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
    
}