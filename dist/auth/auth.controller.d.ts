import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { ForgorPassDto } from "./dto/forgotpass.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<import("src/auth/entity/auth.response").AuthResponse>;
    login(loginDto: LoginDto): Promise<import("src/auth/entity/auth.response").AuthResponse>;
    forgotpass(forgotDto: ForgorPassDto): Promise<import("src/auth/entity/auth.response").AuthResponse>;
}
