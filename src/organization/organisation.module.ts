import { Module } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [OrganisationService],
  controllers: [OrganisationController],
  imports: [PrismaModule, HttpModule],
})
export class OrganisationModule {}
