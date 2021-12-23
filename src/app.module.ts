import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { UserProfileModule } from './user-profile/user-profile.module';
import { OrganisationModule } from './organization/organisation.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AppLoggerMiddleware } from './common/dto/middleware/requestLogger.middleware';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    HttpModule,
    UserProfileModule,
    OrganisationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
