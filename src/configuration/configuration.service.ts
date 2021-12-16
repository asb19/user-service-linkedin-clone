import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  private ENV: string;
  public authUrl: string;
  public commUrl: string;
  public constructor(private readonly configService: ConfigService) {
    this.ENV = this.configService.get<string>('ENV');
    if (this.ENV == 'local') {
      this.authUrl = 'http://localhost:3002/';
      this.commUrl = 'http://localhost:3003';
    }
    if (this.ENV == 'development') {
      this.authUrl = 'https://auth-dev.antino.ca/';
      this.commUrl = 'https://comm-dev.antino.ca/';
    }
  }
}
