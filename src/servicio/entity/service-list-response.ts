import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class ServicioResponseList {
    @Field()
    id: number;

    @Field()
    nombreUsuario:string;

    @Field()
    ocupacion: string;

    @Field()
    categoria: string;

    @Field()
    descripcion:string;

    @Field()
    direccion:string;

    @Field()
    calificacion:number;

    @Field()
    click:number;
}