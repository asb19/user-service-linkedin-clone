import { User } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUserDto.dto';

@Injectable()
export class UserService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

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

  public async updateUser(
    userId: string,
    body: UpdateUserDto,
    otp: string,
  ): Promise<User> {
    //verify phone
    const verificationStatus = await this.httpService
      .post(`http://localhost:3005/communications/verifyOtp`, {
        to: body.contactNo,
        code: otp,
      })
      .toPromise()
      .then((data) => data.data);
    if (!verificationStatus)
      throw new BadRequestException('verification failed');
    const salt = await genSalt(10);
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
