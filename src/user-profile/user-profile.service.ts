import { Prisma, UserProfile } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { dematerialize } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProfileDto } from './dto/createUserProfileDto.dto';

@Injectable()
export class UserProfileService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createProfile(
    body: CreateUserProfileDto,
    userId: string,
  ): Promise<UserProfile> {
    const eduDetails =
      body.userEducationDetails.length > 0
        ? body.userEducationDetails.map((detail) => {
            return {
              ...detail,
              fromTime: new Date(detail.fromTime),
              endTime: new Date(detail.endTime),
            };
          })
        : undefined;

    console.log(eduDetails);

    const user = await this.prismaService.userProfile.findUnique({
      where: { userId },
    });

    if (!user) {
      const userProfile = await this.prismaService.userProfile.create({
        data: {
          userId,
          gender: body.userProfileDetails.gender,
          dob: new Date(body.userProfileDetails.dob),
          currentLocationId: body.userProfileDetails.currentLocationId
            ? body.userProfileDetails.currentLocationId
            : undefined,

          preferredLocations: body.userProfileDetails.preferredLocations
            ? body.userProfileDetails.preferredLocations
            : undefined,

          UserEducation: {
            create: eduDetails,
          },
        },
      });
      return userProfile;
    }

    return this.prismaService.userProfile.update({
      where: {
        userId,
      },
      data: {
        currentLocationId:
          body.userProfileDetails && body.userProfileDetails.currentLocationId
            ? body.userProfileDetails.currentLocationId
            : undefined,
        preferredLocations:
          body.userProfileDetails && body.userProfileDetails.preferredLocations
            ? body.userProfileDetails.preferredLocations
            : undefined,
        UserEducation: {
          create: eduDetails,
        },
      },
    });
  }
}
