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
exports.ServicioController = void 0;
const common_1 = require("@nestjs/common");
const servicio_service_1 = require("./servicio.service");
const create_servicio_dto_1 = require("./dto/create-servicio.dto");
let ServicioController = class ServicioController {
    constructor(servicioService) {
        this.servicioService = servicioService;
    }
    create(createServicioDto) {
        return this.servicioService.create(createServicioDto);
    }
};
exports.ServicioController = ServicioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_servicio_dto_1.CreateServicioDto]),
    __metadata("design:returntype", void 0)
], ServicioController.prototype, "create", null);
exports.ServicioController = ServicioController = __decorate([
    (0, common_1.Controller)('servicio'),
    __metadata("design:paramtypes", [servicio_service_1.ServicioService])
], ServicioController);
//# sourceMappingURL=servicio.controller.js.map