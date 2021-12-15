/* eslint-disable prettier/prettier */
import { UserProfile } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
// import exp from 'constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProfileDto } from './dto/createUserProfileDto.dto';

@Injectable()
export class UserProfileService {
  public constructor(private readonly prismaService: PrismaService) { }

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
    //took certificate details  object from body............
    const certDetails =
      body.userCertificateDetails && body.userCertificateDetails.length > 0
        ? body.userCertificateDetails.map((detail) => {
          return {
            ...detail,
            issuedAt: new Date(detail.issuedAt),
          };
        })
        : undefined;
    //took award details object from body./..........
    const awardDetails =
      body.userAwardsDetails && body.userAwardsDetails.length > 0
        ? body.userAwardsDetails.map((detail) => {
          return {
            ...detail,
            issuedDate: new Date(detail.issuedDate),
          };
        })
        : undefined;
    //took tarining object from body....
    const trainingDetails =
      body.userTraingDetails && body.userTraingDetails.length > 0
        ? body.userTraingDetails.map((detail) => {
          return {
            ...detail,
            startDate: new Date(detail.startDate), //change type string -> date
            endDate: new Date(detail.endDate),
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

          homeLocationId: body.userProfileDetails.homeLocationId
            ? body.userProfileDetails.homeLocationId
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
        UserProfessionalDetail: body.userProfessionalDetails
          ? body.userProfessionalDetails.id
            ? //if professionalDetails id is given
            {
              update: {
                Experiences: { create: experienceDetails },

                UserCertificateDetails: { create: certDetails },
                UserAwardsDetails: { create: awardDetails },
                UserTrainingDetails: { create: trainingDetails },
              },
            }
            : //if professionalDetails id is null
            {
              create: {
                description: body.userProfessionalDetails.description,
                keySkills: body.userProfessionalDetails.keySkills,

                Experiences: { create: experienceDetails },
                UserCertificateDetails: { create: certDetails },
                UserAwardsDetails: { create: awardDetails },
                UserTrainingDetails: { create: trainingDetails },
              },
            }
          : undefined,
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
                updatedAt: new Date(),

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
          homeLocationId:
            body.userProfileDetails && body.userProfileDetails.homeLocationId
              ? body.userProfileDetails.homeLocationId
              : undefined,
          preferredLocations:
            body.userProfileDetails &&
              body.userProfileDetails.preferredLocations
              ? body.userProfileDetails.preferredLocations
              : undefined,
          updatedAt: new Date(),
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
              updatedAt: new Date(),
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
                    updatedAt: new Date(),
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
    } else if (body.userCertificateDetails) {
      //TODO: edit certificateDetails
      const certificateDetails = body.userCertificateDetails.map((detail) => {
        return {
          ...detail,
          issuedAt: new Date(detail.issuedAt),
        };
      });
      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserCertificateDetails: {
                update: {
                  where: {
                    id: certificateDetails[0].id,
                  },
                  data: {
                    certificateName: certificateDetails[0].certificateName,
                    issuedBy: certificateDetails[0].issuedBy,
                    licenceNumber: certificateDetails[0].licenceNumber,
                    issuedAt: certificateDetails[0].issuedAt,
                    certificateURL: certificateDetails[0].certificateURL,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userAwardsDetails) {
      //TODO : edit award details
      const awardDet = body.userAwardsDetails.map((detail) => {
        return {
          ...detail,
          issuedDate: new Date(detail.issuedDate),
        };
      });
      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserAwardsDetails: {
                update: {
                  where: {
                    id: awardDet[0].id,
                  },
                  data: {
                    issuedDate: awardDet[0].issuedDate,

                    title: awardDet[0].title,
                    issuedBy: awardDet[0].issuedBy,
                    awardsDescription: awardDet[0].awardsDescription
                      ? awardDet[0].awardsDescription
                      : undefined,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userTraingDetails) {
      const trainingDet = body.userTraingDetails.map((detail) => {
        return {
          ...detail,
          endDate: new Date(detail.endDate),
          startDate: new Date(detail.startDate),
        };
      });


      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserTrainingDetails: {
                update: {
                  where: {
                    id: trainingDet[0].id,
                  },
                  data: {
                    title: trainingDet[0].title,
                    organizer: trainingDet[0].organizer,
                    startDate: trainingDet[0].startDate,
                    endDate: trainingDet[0].endDate,
                    trainingDecs: trainingDet[0].trainingDecs
                      ? trainingDet[0].trainingDecs
                      : undefined,
                    updatedAt: new Date(),
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
            UserCertificateDetails: true,
            UserAwardsDetails: true,
            UserTrainingDetails: true,
          },
        },
      },
    });
    return user;
  }
}
