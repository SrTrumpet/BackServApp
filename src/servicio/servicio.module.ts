import { TypeOrmModule } from "@nestjs/typeorm";
import { Servicio } from "./entity/servicio.entity";
import { Module } from "@nestjs/common";
import { ServicioController } from "./servicio.controller";
import { ServicioService } from "./servicio.service";
import { ServicioResolver } from "./servicio.resolver";


@Module({
    imports: [TypeOrmModule.forFeature([Servicio])],
    controllers: [ServicioController],
    providers: [ServicioService,ServicioResolver],
    exports: [],
})

export class ServicioModule{}