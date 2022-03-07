import { User } from '.prisma/client';
import { HttpService } from '@nestjs/axios';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  ServiceUnavailableException,
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
  ) {}

  public async findUser(username: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email: username,
      },
    });
  }

  public async iviteAsAdmin(username: string, orgId: number): Promise<User> {
    const user = await this.findUser(username);
    if (!user) throw new NotFoundException('user not found');
    const relation = await this.prismaService.organisationRecruiters.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (relation)
      throw new BadRequestException('already a member of another organisation');
    return await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        OrganisationRecruiters: {
          create: {
            orgId,
          },
        },
        userType: 'recruiter',
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
    try {
      const verificationStatus = await this.httpService
        .post(`${this.configrationService.commUrl}communications/verifyOtp`, {
          to: body.contactNo,
          code: otp,
        })
        .toPromise()
        .then((data) => data.data);
      console.log(verificationStatus);
      if (!verificationStatus)
        throw new BadRequestException('verification failed');
      const findUser = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!findUser.emailVerified)
        throw new BadRequestException('Signup first');

      const user = await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          ...body,
          updatedAt: new Date(),
          UserProfile: {
            create: {
              photoUrl: this.configrationService.profileImageUrl || '',
              UserProfessionalDetail: {
                create: {
                  UserPublicationDetails: {
                    create: {
                      gScholarUrl: null,
                      sciUrl: null,
                      scopusUrl: null,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const returnWithToken = await this.httpService
        .post(`${this.configrationService.authUrl}auth/token`, {
          id: user.id,
          smsVerified: user.smsVerified,
          emailVerified: user.emailVerified,
        })
        .toPromise()
        .then((data) => data.data);

      return returnWithToken;
    } catch (err) {
      if (err instanceof BadRequestException)
        throw new BadRequestException(err.getResponse());
      throw new BadGatewayException('communication service might be down');
    }
  }

  public async resetPassword(
    username: string,
    Password: string,
    otp: string,
  ): Promise<User> {
    try {
      const verificationStatus = await this.httpService
        .post(`${this.configrationService.commUrl}communications/verifyOtp`, {
          to: username,
          code: otp,
        })
        .toPromise()
        .then((data) => data.data);
      if (!verificationStatus) throw new BadRequestException('wrong otp');

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
    } catch (err) {
      if (
        err instanceof BadRequestException ||
        err instanceof NotFoundException
      )
        throw err;
      throw new BadGatewayException('communication service might be down');
    }
  }

  public async deleteUser(email: string): Promise<User> {
    if (
      this.configrationService.ENV == 'staging' ||
      this.configrationService.ENV == 'production'
    )
      throw new MethodNotAllowedException('You are not allowed to delete');

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException('User not found');
    return await this.prismaService.user.delete({
      where: {
        email,
      },
    });
  }
}
