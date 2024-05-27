import { Repository } from "typeorm";
import { Servicio } from "./entity/servicio.entity";
import { CreateServicioDto } from "./dto/create-servicio.dto";
export declare class ServicioService {
    private readonly servicioRespository;
    constructor(servicioRespository: Repository<Servicio>);
    create(createServicioDto: CreateServicioDto): Promise<CreateServicioDto & Servicio>;
}
