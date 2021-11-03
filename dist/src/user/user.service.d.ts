import { User } from '.prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findUser(username: string): Promise<User>;
}
