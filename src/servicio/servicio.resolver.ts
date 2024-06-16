import { Resolver, Args, Mutation, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

// Importa el Guard
import { Guard } from 'src/guard/guard';

// Importa DTOs y entidades
import { CreateServicioDto } from './dto/create-servicio.dto';
import { ServicioResponse } from './entity/servicio.response';

// Importa el servicio
import { ServicioService } from './servicio.service';
import { ServicioResponseList } from './entity/service-list-response';

@Resolver()
export class ServicioResolver{

    constructor (private readonly servicio: ServicioService ){}

    @Mutation(returns => ServicioResponse)
    @UseGuards(Guard)
    async publicarServicio(@Args() createServicioDto: CreateServicioDto, @Context() context:any): Promise<ServicioResponse>{
        const req = context.req;
        console.log(this.extractTokenFromHeader(req));
        return await this.servicio.publicarServicio(createServicioDto,this.extractTokenFromHeader(req));
    }

    @Query(() => [ServicioResponseList])
    @UseGuards(Guard)
    async getAllService(){
        
    }



    private extractTokenFromHeader(request: any): string | undefined {
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return undefined;
        }
        return token;
    }

}