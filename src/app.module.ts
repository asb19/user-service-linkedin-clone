import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { UserProfileModule } from './user-profile/user-profile.module';
import { OrganisationModule } from './organization/organisation.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    HttpModule,
    UserProfileModule,
    OrganisationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
