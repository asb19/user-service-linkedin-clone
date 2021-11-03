import { User } from '.prisma/client';
import { UserByUserNameDto } from './dto/getUserByCred.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    GetUser(query: UserByUserNameDto): Promise<User>;
    greet(): Promise<string>;
}
