import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController],
  imports: [PrismaModule, HttpModule, ConfigurationModule],
})
export class UserProfileModule {}
