import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants/jwt.constants";

@Injectable()
export class Guard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);//aca llama a la funcion extraer token
        if (!token) {
            throw new UnauthorizedException("No token found");
        }
        try {
            // Verify the token and attach user payload to the request object
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            });
            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException("Token is invalid or expired");
        }
        return true; // devuelve verdadero si el token esta bien
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        // Extraer el token del header
        const authHeader = request.headers['authorization'];
        if (!authHeader) {
            return undefined;
        }
        const [type, token] = authHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            return undefined; // lo devuelve si no esta bien formateado
        }
        return token;
    }
}