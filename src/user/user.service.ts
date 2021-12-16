import { User } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateHash } from 'src/utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUserDto.dto';
import { ConfigurationService } from 'src/configuration/configuration.service';

@Injectable()
export class UserService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
    private readonly configrationService: ConfigurationService,
  ) { }

  public async findUser(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  public async createUser(username: string, password: string): Promise<User> {
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
          Password: await generateHash(password),
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
      .post(`${this.configrationService.commUrl}communications/verifyOtp`, {
        to: body.contactNo,
        code: otp,
      })
      .toPromise()
      .then((data) => data.data);
    if (!verificationStatus)
      throw new BadRequestException('verification failed');
    const findUser = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!findUser.emailVerified) throw new BadRequestException('Signup first');

    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
        updatedAt: new Date(),
      },
    });
    return user;
  }

  public async resetPassword(
    username: string,
    Password: string,
    otp: string,
  ): Promise<User> {
    const verificationStatus = await this.httpService
      .post(`${this.configrationService.commUrl}communications/verifyOtp`, {
        to: username,
        code: otp,
      })
      .toPromise()
      .then((data) => data.data);
    if (!verificationStatus)
      throw new BadRequestException('verification failed');

    const user = await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
    if (!user)
      throw new NotFoundException(
        'User with this email not found, signup first!',
      );

    return await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        Password: await generateHash(Password),
      },
    });
  }

  public async getUsers() {
    const loc = [];
    const med = ['zxc', 'abc'];
    const filters = {
      where: {
        preferredLocations: loc.length > 0 ? { hasSome: loc } : undefined,
        mediaUrls: med.length > 0 ? { hasSome: med } : undefined,
      },
    };

    return await this.prismaService.userProfile.findMany(filters);
  }
}
