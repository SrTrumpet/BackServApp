import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ForgorPassDto } from "./dto/forgotpass.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register({ password, email, name, apellidos, nacimiento }: RegisterDto): Promise<{
        message: string;
    }>;
    login({ email, password }: LoginDto): Promise<{
        tocken: string;
    }>;
    forgotpass({ email }: ForgorPassDto): Promise<{
        message: string;
    }>;
    sendPasswordResetEmail(email: string, newPassword: string): Promise<void>;
}
