import { CreateServicioDto } from './dto/create-servicio.dto';
import { ServicioResponse } from './entity/servicio.response';
import { ServicioService } from './servicio.service';
export declare class ServicioResolver {
    private readonly servicio;
    constructor(servicio: ServicioService);
    publicarServicio(createServicioDto: CreateServicioDto, context: any): Promise<ServicioResponse>;
    getAllService(): Promise<void>;
    private extractTokenFromHeader;
}
