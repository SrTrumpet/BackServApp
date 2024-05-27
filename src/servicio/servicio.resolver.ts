import {Resolver, Mutation, Args} from '@nestjs/graphql'
import { ServicioService } from './servicio.service'
import { Servicio } from './entity/servicio.entity'
import { CreateServicioDto } from './dto/create-servicio.dto'
import { ServicioResponse } from './entity/servicio.response'

@Resolver()
export class ServicioResolver{
    constructor (private servicio: ServicioService){}

}