import { prisma, Prisma, User } from '.prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUserDto.dto';

@Injectable()
export class UserService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findUser(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  public async createUser(username: string): Promise<User> {
    return (
      (await this.prismaService.user.findUnique({
        where: {
          email: username,
        },
      })) ||
      (await this.prismaService.user.create({
        data: {
          email: username,
          emailVerified: true,
        },
      }))
    );
  }

  public async updateUser(userId: string, body: UpdateUserDto): Promise<User> {
    //TODO: verify body.phone, on success do the following
    const salt = await genSalt(10);
    if (!body.Password) throw new InternalServerErrorException();
    body.Password = await hash(body.Password, salt);

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: body,
    });
    return user;
  }
}
