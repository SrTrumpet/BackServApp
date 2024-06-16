import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ServicioResponseList {
    @Field()
    id: number;

    @Field()
    ocupacion: string;

    @Field()
    categoria: string;
}