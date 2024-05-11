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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs = require("bcryptjs");
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const nodemailer = require("nodemailer");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register({ password, email, name, apellidos, nacimiento }) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new common_1.BadRequestException("Email already exists");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        await this.usersService.create({
            name,
            apellidos,
            nacimiento,
            email,
            password: hashedPassword,
            cuentaActiva: true
        });
        return {
            message: "User created successfully",
        };
    }
    async login({ email, password }) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid email");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Invalid password");
        }
        const payload = { email: user.email };
        const tocken = await this.jwtService.signAsync(payload);
        return {
            tocken
        };
    }
    async forgotpass({ email }) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Invalid email");
        }
        const newPass = (0, crypto_1.randomBytes)(8).toString('hex');
        const hashedNewPass = await bcryptjs.hash(newPass, 10);
        await this.usersService.updatePassword(user.id, hashedNewPass);
        await this.sendPasswordResetEmail(email, newPass);
        return {
            message: "Contraseña reseteada. Verifica tu email"
        };
    }
    async sendPasswordResetEmail(email, newPassword) {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'marcapp.service@gmail.com',
                pass: 'grny rzsu lvlm qxgf'
            }
        });
        const mailOptions = {
            from: '"MarcApp" <marcapp.service@gmail.com>',
            to: email,
            subject: 'Tu nueva contraseña',
            text: `Tu nueva contraseña es: ${newPassword}`,
            html: `<b>Tu nueva contraseña es:</b> ${newPassword}`
        };
        await transporter.sendMail(mailOptions);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map