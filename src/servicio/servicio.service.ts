import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Servicio } from "./entity/servicio.entity";
import { CreateServicioDto } from "./dto/create-servicio.dto";

@Injectable()

export class ServicioService{
    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRespository : Repository<Servicio>
    ){}

    async create(createServicioDto: CreateServicioDto){
        return await this.servicioRespository.save(createServicioDto);
    }
    
}