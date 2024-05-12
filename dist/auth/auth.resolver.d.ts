import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './entity/auth.response';
import { AuthService } from "./auth.service";
import { ForgorPassDto } from './dto/forgotpass.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    forgotPass(forgotpass: ForgorPassDto): Promise<AuthResponse>;
    login(logindDto: LoginDto): Promise<AuthResponse>;
}
