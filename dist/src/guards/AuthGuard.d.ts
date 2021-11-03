import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthGuard implements CanActivate {
    private readonly httpService;
    constructor(httpService: HttpService);
    canActivate(context: ExecutionContext): Promise<any>;
}
