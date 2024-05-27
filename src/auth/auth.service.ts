import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    } from "@nestjs/common";
    import * as bcryptjs from "bcryptjs";
    import { randomBytes } from 'crypto';
    import { RegisterDto } from "./dto/register.dto";
    import { LoginDto } from "./dto/login.dto";
    import { ForgorPassDto } from "./dto/forgotpass.dto";
    import { JwtService } from "@nestjs/jwt";
    import { UsersService } from "src/users/users.service";
    import * as nodemailer from 'nodemailer';
import { AuthResponse } from "./entity/auth.response";


    @Injectable()
    export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    // REGISTRO
    async register({ password, email, name, apellidos}: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException("El Email ya existe!");
        }

        const hashedPassword = await bcryptjs.hash(password, 10); 
        await this.usersService.create({
            name,
            apellidos,
            email,
            password: hashedPassword,
            cuentaActiva : true
        }); 

        return {
            message: "Usuario creado con exito",
        }as AuthResponse;
    }

    //LOGIN
    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException("Email no valido");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Constraseña no valida");
        }

        const payload = {email: user.email, id: user.id, name: user.name};

        const token = await this.jwtService.signAsync(payload);

        return {
            token
        }as AuthResponse;
    }

    //OLVIDO DE CONTRASENNA
    async forgotpass({email}: ForgorPassDto){

        const user = await this.usersService.findOneByEmail(email);

        if (!user) { 
            throw new UnauthorizedException("Email no valido");
        }

        const newPass = randomBytes(8).toString('hex');
        const hashedNewPass = await bcryptjs.hash(newPass, 10);
        
        await this.usersService.updatePassword(user.id, hashedNewPass);
        
        await this.sendPasswordResetEmail(email, newPass);
        
        return {
            message: "Contraseña reseteada. Verifica tu email"
        } as AuthResponse;
        
    }
    
    //ENVIO DE CONTRASENNA POR EMAIL
    async sendPasswordResetEmail(email: string, newPassword: string) {

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
}
