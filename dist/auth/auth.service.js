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
    async register({ password, email, name, apellidos }) {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new common_1.BadRequestException("El Email ya existe!");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        await this.usersService.create({
            name,
            apellidos,
            email,
            password: hashedPassword,
            cuentaActiva: true
        });
        return {
            message: "Usuario creado con exito",
        };
    }
    async login({ email, password }) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Email no valido");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException("Constraseña no valida");
        }
        const payload = { email: user.email, id: user.id, name: user.name };
        const token = await this.jwtService.signAsync(payload);
        return {
            token
        };
    }
    async forgotpass({ email }) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException("Email no valido");
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
            html: `
                <html>
                    <body>
                        <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; color: #333;">
                            <h2>Hola,</h2>
                            <p>Hemos restablecido tu contraseña. Aquí tienes tu nueva contraseña para acceder a <strong>MarcApp</strong>:</p>
                            <p style="font-size: 18px; color: #555;">
                                <strong>Contraseña:</strong> <span style="background-color: #f0f0f0; padding: 8px 12px; border-radius: 4px; font-weight: bold;">${newPassword}</span>
                            </p>
                            <p>Te recomendamos cambiar esta contraseña por una propia tan pronto como inicies sesión.</p>
                            <p>Si no has solicitado un restablecimiento de contraseña, por favor ignora este correo o ponte en contacto con nosotros.</p>
                            <footer>
                                <p>Saludos cordiales,</p>
                                <p>Equipo de <strong>MarcApp</strong></p>
                            </footer>
                        </div>
                    </body>
                </html>
            `
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