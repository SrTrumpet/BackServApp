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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Servicio = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let Servicio = class Servicio {
};
exports.Servicio = Servicio;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Servicio.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Servicio.prototype, "idUser", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Servicio.prototype, "nombreUsuario", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 500 }),
    __metadata("design:type", String)
], Servicio.prototype, "ocupacion", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Servicio.prototype, "categoria", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], Servicio.prototype, "activo", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Servicio.prototype, "click", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Servicio.prototype, "calificacion", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Servicio.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Servicio.prototype, "direccion", void 0);
exports.Servicio = Servicio = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Servicio);
//# sourceMappingURL=servicio.entity.js.map