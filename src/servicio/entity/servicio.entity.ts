import { Entity, PrimaryGeneratedColumn, Column, IntegerType } from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Servicio {
    @Field(() => ID) // GraphQL: Usar ID para el campo id
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    idUser: number;

    @Field()
    @Column()
    nombreUsuario:string;

    @Field() // GraphQL: Exponer este campo
    @Column({ length: 500 })
    ocupacion: string;

    @Field() // GraphQL: Exponer este campo
    @Column({ length: 100 })
    categoria: string;

    @Field(() => Boolean) // GraphQL: Exponer este campo
    @Column()
    activo: boolean;

    @Field( () => Int) // GraphQL: No exponer el campo de contraseña para consultas, pero aquí se muestra cómo sería si quisieras
    @Column({default: 0})
    click: number;

    @Field(() => Float) // GraphQL: Exponer este campo
    @Column({ default: 0 })
    calificacion: number;

    @Field() // GraphQL: Usar Boolean para este campo
    @Column()
    descripcion: string;

    @Field()
    @Column()
    direccion: string;
}
