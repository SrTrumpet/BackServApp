import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail} from "class-validator";

@ArgsType()
export class ForgorPassDto{

    @Field()
    @IsEmail()
    email: string;

}

