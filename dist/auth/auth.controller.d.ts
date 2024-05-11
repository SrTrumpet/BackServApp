import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { ForgorPassDto } from "./dto/forgotpass.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        tocken: string;
    }>;
    forgotpass(forgotDto: ForgorPassDto): Promise<{
        message: string;
    }>;
}
