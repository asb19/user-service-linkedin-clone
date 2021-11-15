import { UserProfile } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import exp from 'constants';
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
      body.userEducationDetails && body.userEducationDetails.length > 0
        ? body.userEducationDetails.map((detail) => {
            const insId = detail.instituteId;
            delete detail.instituteId;
            return {
              ...detail,
              fromTime: new Date(detail.fromTime),
              endTime: new Date(detail.endTime),
              Institute: insId
                ? { connect: { id: insId } }
                : {
                    create: detail.Institute,
                  },
            };
          })
        : undefined;

    const experienceDetails =
      body.userExperienceDetails && body.userExperienceDetails.length > 0
        ? body.userExperienceDetails.map((detail) => {
            const oId = detail.organisationId;
            delete detail.organisationId;
            return {
              ...detail,
              fromTime: new Date(detail.fromTime),
              endTime: new Date(detail.endTime),
              Organisation: !oId
                ? {
                    create: detail.Organisation,
                  }
                : { connect: { id: oId } },
            };
          })
        : undefined;

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
        gender:
          body.userProfileDetails && body.userProfileDetails.gender
            ? body.userProfileDetails.gender
            : undefined,
        dob:
          body.userProfileDetails && body.userProfileDetails.dob
            ? new Date(body.userProfileDetails.dob)
            : undefined,

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
        UserProfessionalDetail:
          body.userProfessionalDetails && body.userProfessionalDetails.id
            ? {
                update: {
                  Experiences: { create: experienceDetails },
                },
              }
            : {
                create: {
                  description: body.userProfessionalDetails.description,
                  keySkills: body.userProfessionalDetails.keySkills,

                  Experiences: { create: experienceDetails },
                },
              },
      },
    });
  }

  public async editProfileDetails(
    body: CreateUserProfileDto,
    userId: string,
  ): Promise<UserProfile> {
    const user = await this.prismaService.userProfile.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found to edit details');
    }

    if (body.userEducationDetails && body.userEducationDetails.length > 0) {
      const eduDetails = body.userEducationDetails.map((detail) => {
        return {
          ...detail,
          fromTime: new Date(detail.fromTime),
          endTime: new Date(detail.endTime),
        };
      });

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserEducation: {
            update: {
              where: {
                id: eduDetails[0].id,
              },
              data: {
                degreeOrDiploma: eduDetails[0].degreeOrDiploma,
                description: eduDetails[0].description,
                endTime: eduDetails[0].endTime,
                field: eduDetails[0].field,
                fromTime: eduDetails[0].fromTime,

                Institute: {
                  create: eduDetails[0].Institute || undefined,
                },
              },
            },
          },
        },
      });
    } else if (body.userProfileDetails) {
      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          gender:
            body.userProfileDetails && body.userProfileDetails.gender
              ? body.userProfileDetails.gender
              : undefined,
          dob:
            body.userProfileDetails && body.userProfileDetails.dob
              ? new Date(body.userProfileDetails.dob)
              : undefined,

          currentLocationId:
            body.userProfileDetails && body.userProfileDetails.currentLocationId
              ? body.userProfileDetails.currentLocationId
              : undefined,
          preferredLocations:
            body.userProfileDetails &&
            body.userProfileDetails.preferredLocations
              ? body.userProfileDetails.preferredLocations
              : undefined,
        },
      });
    } else if (body.userProfessionalDetails && !body.userExperienceDetails) {
      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              description: body.userProfessionalDetails.description,
              keySkills: body.userProfessionalDetails.keySkills,
            },
          },
        },
      });
    } else if (body.userExperienceDetails) {
      const expDetails = body.userExperienceDetails.map((detail) => {
        return {
          ...detail,
          fromTime: new Date(detail.fromTime),
          endTime: new Date(detail.endTime),
        };
      });

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              Experiences: {
                update: {
                  where: {
                    id: expDetails[0].id,
                  },
                  data: {
                    designation: expDetails[0].designation,
                    fromTime: expDetails[0].fromTime,
                    endTime: expDetails[0].endTime,
                    industry: expDetails[0].industry,
                    mediaUrls: expDetails[0].mediaUrls,
                    isCurrent: expDetails[0].isCurrent,
                    Organisation: {
                      create: expDetails[0].Organisation || undefined,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
  }

  public async getProfileDetails(userId: string): Promise<UserProfile> {
    const user = await this.prismaService.userProfile.findUnique({
      where: {
        userId,
      },
      include: {
        UserEducation: {
          where: {
            statusId: 1,
          },
          include: {
            Institute: {
              select: {
                fullName: true,
              },
            },
          },
        },
        User: true,
        currentLocation: true,
        homeLocation: true,
        UserProfessionalDetail: {
          include: {
            Experiences: true,
          },
        },
      },
    });
    return user;
  }
}
