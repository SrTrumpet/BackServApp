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
exports.ServicioResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const guard_1 = require("../guard/guard");
const create_servicio_dto_1 = require("./dto/create-servicio.dto");
const servicio_response_1 = require("./entity/servicio.response");
const servicio_service_1 = require("./servicio.service");
let ServicioResolver = class ServicioResolver {
    constructor(servicio) {
        this.servicio = servicio;
    }
    async publicarServicio(createServicioDto, ctx) {
        return await this.servicio.publicarServicio(createServicioDto, ctx.req.user.userId);
    }
};
exports.ServicioResolver = ServicioResolver;
__decorate([
    (0, graphql_1.Mutation)(returns => servicio_response_1.ServicioResponse),
    (0, common_1.UseGuards)(guard_1.Guard),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_1.Context)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servicio_dto_1.CreateServicioDto, Object]),
    __metadata("design:returntype", Promise)
], ServicioResolver.prototype, "publicarServicio", null);
exports.ServicioResolver = ServicioResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [servicio_service_1.ServicioService])
], ServicioResolver);
//# sourceMappingURL=servicio.resolver.js.map