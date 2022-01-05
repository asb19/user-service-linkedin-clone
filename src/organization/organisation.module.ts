import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigurationModule } from 'src/configuration/configuration.module';

@Module({
  providers: [OrganisationService],
  controllers: [OrganisationController],
  imports: [PrismaModule, HttpModule, ConfigurationModule],
})
export class OrganisationModule {}
