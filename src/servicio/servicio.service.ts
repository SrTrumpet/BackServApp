import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Servicio } from "./entity/servicio.entity";
import { CreateServicioDto } from "./dto/create-servicio.dto";
import { ServicioResponse } from "./entity/servicio.response";

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRepository: Repository<Servicio>
    ) {}

    async publicarServicio(createServicioDto: CreateServicioDto, iduser): Promise<ServicioResponse> {

        await this.create({
            idUser: iduser,
            ...createServicioDto,
            activo: true,
            click: 0,
            calificacion: 0.0
        });

        return {
            message: "Servicio publicado",
        } as ServicioResponse;
    }

    private async findById(id: number): Promise<Servicio | undefined> {
        return await this.servicioRepository.findOneBy({id});
    }

    async create(createServiceDto: CreateServicioDto) {
        return await this.servicioRepository.save(createServiceDto);
    }
}
