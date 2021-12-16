import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configurationService: ConfigurationService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<any> {
    Logger.log('Auth Guard');
    const req = context.switchToHttp().getRequest();

    try {
      console.log('inside guard');
      console.log(this.configurationService.authUrl);
      const res = await this.httpService
        .get(`${this.configurationService.authUrl}auth/check`, {
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
