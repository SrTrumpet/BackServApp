import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Servicio } from "./entity/servicio.entity";
import { CreateServicioDto } from "./dto/create-servicio.dto";
import { ServicioResponse } from "./entity/servicio.response";

import * as jwt from 'jsonwebtoken';
import { jwtConstants } from "../auth/constants/jwt.constants";

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(Servicio)
        private readonly servicioRepository: Repository<Servicio>
    ) {}

    async publicarServicio(createServicioDto: CreateServicioDto, token): Promise<ServicioResponse> {
        
        let datosUsuario: any;
        datosUsuario = jwt.verify(token, jwtConstants.secret );

        await this.create({
            idUser: datosUsuario.id,
            nombreUsuario:datosUsuario.name,
            ...createServicioDto,
            activo: true,
            click: 0,
            calificacion: 0.0,
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
