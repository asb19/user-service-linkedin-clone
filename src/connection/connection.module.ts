import { Module } from '@nestjs/common';
import { ConnectionService } from './connection.service';
import { ConnectionController } from './connection.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Module({
  providers: [ConnectionService, PrismaService, ConfigurationService],
  controllers: [ConnectionController],
  imports: [HttpModule, ConfigModule],
})
export class ConnectionModule {}
