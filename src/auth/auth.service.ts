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
    

    @Injectable()
    export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register({ password, email, name, apellidos ,nacimiento}: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
        throw new BadRequestException("Email already exists");
        }

        const hashedPassword = await bcryptjs.hash(password, 10); 
        await this.usersService.create({
        name,
        apellidos,
        nacimiento,
        email,
        password: hashedPassword,
        cuentaActiva : true
        }); 

        return {
        message: "User created successfully",
        };
    }

    async login({ email, password }: LoginDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
        throw new UnauthorizedException("Invalid email");
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid) {
        throw new UnauthorizedException("Invalid password");
        }

        const payload = {email: user.email};

        const tocken = await this.jwtService.signAsync(payload);

        return {
            tocken
        };
    }

    async forgotpass({email}: ForgorPassDto){

        const user = await this.usersService.findOneByEmail(email);

        if (!user) { 
            throw new UnauthorizedException("Invalid email");
            }

        const newPass = randomBytes(8).toString('hex');
        const hashedNewPass = await bcryptjs.hash(newPass, 10);
        
        await this.usersService.updatePassword(user.id, hashedNewPass);
        
        await this.sendPasswordResetEmail(email, newPass);
        
        return {
            message: "Contraseña reseteada. Verifica tu email"
        };
        
    }
    
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
            html: `<b>Tu nueva contraseña es:</b> ${newPassword}`
        };
    
        await transporter.sendMail(mailOptions);

        
    }


}
