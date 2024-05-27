import { Controller, Post, Body } from "@nestjs/common";
import { ServicioService } from "./servicio.service";
import { CreateServicioDto } from "./dto/create-servicio.dto";


@Controller('servicio')
export class ServicioController{
    constructor (private readonly servicioService: ServicioService){}

    @Post()
    create(@Body () createServicioDto: CreateServicioDto){
        return this.servicioService.create(createServicioDto);
    }

}