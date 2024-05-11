import { UsersService } from './users.service';
import { User } from 'src/users/entities/user.entity';
export declare class UsersResolver {
    private usersService;
    constructor(usersService: UsersService);
    user(email: string): Promise<User>;
    prueba(): string;
}
