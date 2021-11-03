import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, HttpModule],
})
export class UserModule {}
