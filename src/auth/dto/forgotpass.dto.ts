import { IsEmail} from "class-validator";

export class ForgorPassDto{

    @IsEmail()
    email: string;

}

