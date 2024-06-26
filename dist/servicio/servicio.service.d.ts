import { Repository } from "typeorm";
import { Servicio } from "./entity/servicio.entity";
import { CreateServicioDto } from "./dto/create-servicio.dto";
import { ServicioResponse } from "./entity/servicio.response";
import { ServicioResponseList } from "./entity/service-list-response";
export declare class ServicioService {
    private readonly servicioRepository;
    constructor(servicioRepository: Repository<Servicio>);
    publicarServicio(createServicioDto: CreateServicioDto, token: any): Promise<ServicioResponse>;
    private findById;
    create(createServiceDto: CreateServicioDto): Promise<CreateServicioDto & Servicio>;
    findByName(ocupacion: string): Promise<ServicioResponseList[] | undefined>;
    findAllServices(): Promise<ServicioResponseList[] | undefined>;
}
