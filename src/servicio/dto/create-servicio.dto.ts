import { InputType, Field, ArgsType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class CreateServicioDto{

    idUser: number;
    nombreUsuario:string;

    @Field()
    @IsString()
    ocupacion: string;

    @Field()
    @IsString()
    categoria: string;
    
    activo:boolean;
    click:number;
    calificacion: number;

    @Field()
    @IsString()
    descripcion:string;

    @Field()
    @IsString()
    direccion:string
}