import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  public async canActivate(context: ExecutionContext): Promise<any> {
    Logger.log('Auth Guard');
    const req = context.switchToHttp().getRequest();

    try {
      console.log('inside guard');
      const res = await this.httpService
        .get(`https://auth-dev.antino.ca/auth/check`, {
          headers: {
            'x-auth-token': req.headers['authorization']?.split(' ')[1],
          },
        })
        .pipe()
        .toPromise();
      req.user = res.data;
      console.log(res.data);
      return res.data;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
