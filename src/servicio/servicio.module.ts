import { TypeOrmModule } from "@nestjs/typeorm";
import { Servicio } from "./entity/servicio.entity";
import { Module } from "@nestjs/common";
import { ServicioController } from "./servicio.controller";
import { ServicioService } from "./servicio.service";


@Module({
    imports: [TypeOrmModule.forFeature([Servicio])],
    controllers: [ServicioController],
    providers: [ServicioService,],
    exports: [],
})

export class ServicioModule{}