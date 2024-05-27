import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from 'src/users/entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(of => User)
export class UsersResolver {
    constructor(private usersService: UsersService) {}

    @Query(returns => User)
    async user(@Args('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }

    @Query ( () => String, {name: 'mensaje', description: 'Retorna HelloMundo'})
    prueba():string{
        return 'HolaMundo'
    }
}
