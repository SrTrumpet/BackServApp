"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicioService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const servicio_entity_1 = require("./entity/servicio.entity");
const jwt = require("jsonwebtoken");
const jwt_constants_1 = require("../auth/constants/jwt.constants");
let ServicioService = class ServicioService {
    constructor(servicioRepository) {
        this.servicioRepository = servicioRepository;
    }
    async publicarServicio(createServicioDto, token) {
        let datosUsuario;
        datosUsuario = jwt.verify(token, jwt_constants_1.jwtConstants.secret);
        await this.create({
            idUser: datosUsuario.id,
            nombreUsuario: datosUsuario.name,
            ...createServicioDto,
            activo: true,
            click: 0,
            calificacion: 0.0,
        });
        return {
            message: "Servicio publicado",
        };
    }
    async findById(id) {
        return await this.servicioRepository.findOneBy({ id });
    }
    async create(createServiceDto) {
        return await this.servicioRepository.save(createServiceDto);
    }
    async findByName(ocupacion) {
        return await this.servicioRepository.find({
            where: { ocupacion },
            select: ["id", "nombreUsuario", "ocupacion", "categoria", "descripcion", "direccion", "calificacion", "click"]
        });
    }
    async findAllServices() {
        return await this.servicioRepository.find({
            select: ["id", "nombreUsuario", "ocupacion", "categoria", "descripcion", "direccion", "calificacion", "click"]
        });
    }
};
exports.ServicioService = ServicioService;
exports.ServicioService = ServicioService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(servicio_entity_1.Servicio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServicioService);
//# sourceMappingURL=servicio.service.js.map