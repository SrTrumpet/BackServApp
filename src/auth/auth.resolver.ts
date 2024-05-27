//GraphQL
import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';

//Variables para la solicitud
import { RegisterDto } from './dto/register.dto';
import { AuthResponse } from './entity/auth.response';
import { ForgorPassDto } from './dto/forgotpass.dto';
import { LoginDto } from './dto/login.dto';


//Servicio
import { AuthService } from "./auth.service";



@Resolver()
export class AuthResolver{

    constructor (private readonly authService : AuthService){}

    @Mutation(returns => AuthResponse) // Utiliza AuthResponse para el retorno (Message)
    async register(@Args() registerDto: RegisterDto): Promise<AuthResponse> {
        return this.authService.register(registerDto);
    }

    @Mutation(returns => AuthResponse)// Utiliza AuthResponse para el retorno (Message)
    async forgotPass(@Args() forgotpass : ForgorPassDto): Promise<AuthResponse>{
        return this.authService.forgotpass(forgotpass);
    }

    @Mutation(returns => AuthResponse)
    async login(@Args() logindDto : LoginDto ): Promise<AuthResponse>{
        return this.authService.login(logindDto);
    }

    @Query(() => String)
    dummyQuery(): string {
        return "This query does nothing.";
    }
}

//guardarlo en una cockie
//