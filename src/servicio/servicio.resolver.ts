import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

// Importa el Guard
import { Guard } from 'src/guard/guard';

// Importa DTOs y entidades
import { CreateServicioDto } from './dto/create-servicio.dto';
import { ServicioResponse } from './entity/servicio.response';

// Importa el servicio
import { ServicioService } from './servicio.service';


@Resolver()
export class ServicioResolver{

    constructor (private readonly servicio: ServicioService ){}

    @Mutation(returns => ServicioResponse)
    @UseGuards(Guard)
    async publicarServicio(@Args() createServicioDto: CreateServicioDto, @Context() ctx): Promise<ServicioResponse>{
        return await this.servicio.publicarServicio(createServicioDto,ctx.req.user.userId);
    }
}