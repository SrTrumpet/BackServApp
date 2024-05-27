import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ServicioResponse{
    @Field()
    message: string;
}