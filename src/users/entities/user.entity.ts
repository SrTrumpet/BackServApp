import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID) // GraphQL: Usar ID para el campo id
    @PrimaryGeneratedColumn()
    id: number;

  @Field() // GraphQL: Exponer este campo
    @Column({ length: 500 })
    name: string;

  @Field() // GraphQL: Exponer este campo
    @Column({ length: 100 })
    apellidos: string;

  @Field() // GraphQL: Exponer este campo
    @Column({ unique: true, nullable: false })
    email: string;

  @Field() // GraphQL: No exponer el campo de contraseña para consultas, pero aquí se muestra cómo sería si quisieras
    @Column({ nullable: false })
    password: string;

  @Field() // GraphQL: Exponer este campo
    @Column({ default: "user" })
    rol: string;

  @Field(() => Boolean) // GraphQL: Usar Boolean para este campo
    @Column({ default: true })
    cuentaActiva: boolean;
}
