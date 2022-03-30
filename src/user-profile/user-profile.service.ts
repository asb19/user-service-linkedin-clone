import { UserProfile } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { transformDocument } from '@prisma/client/runtime';
// import exp from 'constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserProfileDto } from './dto/createUserProfileDto.dto';
import { SearchUsersByNameDto } from './dto/searchUsers.dto';

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
              fromTime: detail.fromTime ? new Date(detail.fromTime) : undefined,
              endTime: detail.endTime ? new Date(detail.endTime) : undefined,
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
              endTime: detail.endTime ? new Date(detail.endTime) : undefined,
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
              startDate: new Date(detail.startDate),
              endDate: new Date(detail.endDate),
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
    //took training object from body....
    const trainingDetails =
      body.userTrainingDetails && body.userTrainingDetails.length > 0
        ? body.userTrainingDetails.map((detail) => {
            return {
              ...detail,
              startDate: new Date(detail.startDate), //change type string -> date
              endDate: new Date(detail.endDate),
            };
          })
        : undefined;

    const publicationDetails = body.userPublicationDetails || undefined;

    const patentDetails =
      body.userPatentDetails && body.userPatentDetails.length > 0
        ? body.userPatentDetails.map((detail) => {
            return {
              ...detail,
              date: detail.date ? new Date(detail.date) : undefined,
            };
          })
        : undefined;

    const hobbies = body.userHobbies ? { ...body.userHobbies } : undefined;

    const curriculumDetails = body.userCurriculumDetails
      ? { ...body.userCurriculumDetails }
      : undefined;

    const scholarDetails =
      body.userScholarshipDetails && body.userScholarshipDetails.length > 0
        ? body.userScholarshipDetails.map((detail) => {
            return {
              ...detail,
              amount: detail.amount || '0',
            };
          })
        : undefined;

    const googleCertDetails =
      body.userGoogleCertificationDetails &&
      body.userGoogleCertificationDetails.length > 0
        ? body.userGoogleCertificationDetails.map((detail) => {
            return {
              ...detail,
              issuedAt: new Date(detail.issuedAt),
            };
          })
        : undefined;

    const scopusDetails =
      body.userScopusDetails && body.userScopusDetails.length > 0
        ? body.userScopusDetails.map((detail) => {
            return {
              ...detail,
              issuedAt: new Date(detail.issuedAt),
            };
          })
        : undefined;

    const HIdexDetails =
      body.userHindexDetails && body.userHindexDetails.length > 0
        ? body.userHindexDetails.map((detail) => {
            return {
              ...detail,
              issuedAt: new Date(detail.issuedAt),
            };
          })
        : undefined;
    const user = await this.prismaService.userProfile.findUnique({
      where: { userId },
    });
    console.log(user);
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
        mediaUrls:
          (body.userProfileDetails && body.userProfileDetails.mediaUrls) ||
          undefined,

        currentLocationId:
          body.userProfileDetails && body.userProfileDetails.currentLocationId
            ? body.userProfileDetails.currentLocationId
            : undefined,
        preferredLocations:
          body.userProfileDetails && body.userProfileDetails.preferredLocations
            ? body.userProfileDetails.preferredLocations
            : undefined,
        homeLocationId:
          body.userProfileDetails && body.userProfileDetails.homeLocationId
            ? body.userProfileDetails.homeLocationId
            : undefined,
        adhaarNo:
          body.userProfileDetails && body.userProfileDetails.adhaarNo
            ? body.userProfileDetails.adhaarNo
            : undefined,
        photoUrl:
          body.userProfileDetails && body.userProfileDetails.photoUrl
            ? body.userProfileDetails.photoUrl
            : undefined,
        passportNo:
          body.userProfileDetails && body.userProfileDetails.passportNo
            ? body.userProfileDetails.passportNo
            : undefined,
        passportPlaceAndCountryOfIssue:
          body.userProfileDetails &&
          body.userProfileDetails.passportPlaceAndCountryOfIssue
            ? body.userProfileDetails.passportPlaceAndCountryOfIssue
            : undefined,
        passportValidity:
          body.userProfileDetails && body.userProfileDetails.passportValidity
            ? new Date(body.userProfileDetails.passportValidity)
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
                  UserPublicationDetails: { create: publicationDetails },
                  UserPatentDetails: { create: patentDetails },
                  UserHobbies: { create: hobbies },
                  UserScopusDetails: { create: scopusDetails },
                  UserScholarshipDetails: { create: scholarDetails },
                  UserCurriculumDetails: { create: curriculumDetails },
                  UserGoogleCertificationDetails: { create: googleCertDetails },
                  UserHindexDetails: { create: HIdexDetails },
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
                  UserPublicationDetails: { create: publicationDetails },
                  UserPatentDetails: { create: patentDetails },
                  UserHobbies: { create: hobbies },
                  UserScopusDetails: { create: scopusDetails },
                  UserCurriculumDetails: { create: curriculumDetails },
                  UserScholarshipDetails: { create: scholarDetails },
                  UserGoogleCertificationDetails: { create: googleCertDetails },
                  UserHindexDetails: { create: HIdexDetails },
                },
              }
          : undefined,
      },
      include: {
        UserProfessionalDetail: {
          select: { id: true },
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
          fromTime: detail.fromTime ? new Date(detail.fromTime) : undefined,
          endTime: detail.endTime ? new Date(detail.endTime) : undefined,
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
                degreeOrDiploma: eduDetails[0].degreeOrDiploma || undefined,
                description: eduDetails[0].description || undefined,
                endTime: eduDetails[0].endTime || undefined,
                field: eduDetails[0].field || undefined,
                fromTime: eduDetails[0].fromTime || undefined,
                updatedAt: new Date(),
                statusId: eduDetails[0].statusId == 0 ? 0 : undefined,

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
          User: {
            update: {
              firstName: body.userProfileDetails.firstName || undefined,
              lastName: body.userProfileDetails.lastName || undefined,
            },
          },
          dob:
            body.userProfileDetails && body.userProfileDetails.dob
              ? new Date(body.userProfileDetails.dob)
              : undefined,

          // currentLocationId:
          //   body.userProfileDetails && body.userProfileDetails.currentLocationId
          //     ? {set: }
          //     : undefined,
          currentLocation:
            body.userProfileDetails && body.userProfileDetails.currentLocationId
              ? {
                  connect: {
                    id: body.userProfileDetails.currentLocationId,
                  },
                }
              : undefined,
          // homeLocationId:
          //   body.userProfileDetails && body.userProfileDetails.homeLocationId
          //     ? body.userProfileDetails.homeLocationId
          //     : undefined,
          homeLocation:
            body.userProfileDetails && body.userProfileDetails.homeLocationId
              ? {
                  connect: {
                    id: body.userProfileDetails.homeLocationId,
                  },
                }
              : undefined,
          preferredLocations:
            body.userProfileDetails &&
            body.userProfileDetails.preferredLocations
              ? body.userProfileDetails.preferredLocations
              : undefined,
          updatedAt: new Date(),
          passportNo: body.userProfileDetails.passportNo || undefined,
          passportPlaceAndCountryOfIssue:
            body.userProfileDetails.passportPlaceAndCountryOfIssue || undefined,
          passportValidity: body.userProfileDetails.passportValidity
            ? new Date(body.userProfileDetails.passportValidity)
            : undefined,
          adhaarNo: body.userProfileDetails.adhaarNo || undefined,
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
          endTime: detail.endTime ? new Date(detail.endTime) : undefined,
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
                    designation: expDetails[0].designation || undefined,
                    fromTime: expDetails[0].fromTime || undefined,
                    description: expDetails[0].description || undefined,
                    endTime: expDetails[0].endTime || undefined,
                    industry: expDetails[0].industry || undefined,
                    mediaUrls: expDetails[0].mediaUrls || undefined,
                    isCurrent: expDetails[0].isCurrent || undefined,
                    statusCode: expDetails[0].statusCode == 0 ? 0 : undefined,
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
          startDate: detail.startDate ? new Date(detail.startDate) : undefined,
          endDate: detail.endDate ? new Date(detail.endDate) : undefined,
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
                    certificateName:
                      certificateDetails[0].certificateName || undefined,
                    issuedBy: certificateDetails[0].issuedBy || undefined,
                    licenceNumber:
                      certificateDetails[0].licenceNumber || undefined,
                    startDate: certificateDetails[0].startDate || undefined,
                    endDate: certificateDetails[0].endDate || undefined,
                    certificateURL:
                      certificateDetails[0].certificateURL || undefined,
                    updatedAt: new Date(),
                    statusCode:
                      certificateDetails[0].statusCode == 0 ? 0 : undefined,
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
          issuedDate: detail.issuedDate
            ? new Date(detail.issuedDate)
            : undefined,
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
                    issuedDate: awardDet[0].issuedDate || undefined,

                    title: awardDet[0].title || undefined,
                    issuedBy: awardDet[0].issuedBy || undefined,
                    awardsDescription: awardDet[0].awardsDescription
                      ? awardDet[0].awardsDescription
                      : undefined,
                    statusCode: awardDet[0].statusCode == 0 ? 0 : undefined,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userTrainingDetails) {
      const trainingDet = body.userTrainingDetails.map((detail) => {
        return {
          ...detail,
          endDate: detail.endDate ? new Date(detail.endDate) : undefined,
          startDate: detail.startDate ? new Date(detail.startDate) : undefined,
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
                    title: trainingDet[0].title || undefined,
                    organizer: trainingDet[0].organizer || undefined,
                    startDate: trainingDet[0].startDate || undefined,
                    endDate: trainingDet[0].endDate || undefined,
                    trainingDecs: trainingDet[0].trainingDecs
                      ? trainingDet[0].trainingDecs
                      : undefined,
                    statusCode: trainingDet[0].statusCode == 0 ? 0 : undefined,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userPublicationDetails) {
      const publicationDetails = body.userPublicationDetails;

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserPublicationDetails: {
                update: {
                  ...publicationDetails,
                  updatedAt: new Date(),
                },
              },
            },
          },
        },
      });
    } else if (body.userPatentDetails) {
      const patentDetails = body.userPatentDetails.map((detail) => {
        return {
          ...detail,
          date: detail.date ? new Date(detail.date) : undefined,
        };
      });

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserPatentDetails: {
                update: {
                  where: {
                    id: patentDetails[0].id,
                  },
                  data: {
                    IPRTitle: patentDetails[0].IPRTitle,
                    title: patentDetails[0].title,
                    patentDecs: patentDetails[0].patentDecs,
                    date: patentDetails[0].date || undefined,
                    statusCode: patentDetails[0].statusCode,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userHobbies) {
      const hobbies = { ...body.userHobbies };

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserHobbies: {
                update: {
                  hobbies: hobbies.hobbies,
                  statusCode: hobbies.statusCode,
                  updatedAt: new Date(),
                },
              },
            },
          },
        },
      });
    } else if (body.userCurriculumDetails) {
      const curriculumDetails = { ...body.userCurriculumDetails };

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserCurriculumDetails: {
                update: {
                  activities: curriculumDetails.activities,
                  statusCode: curriculumDetails.statusCode || undefined,
                  mediaUrls: curriculumDetails.mediaUrls,
                  updatedAt: new Date(),
                },
              },
            },
          },
        },
      });
    } else if (body.userScholarshipDetails) {
      const scholarDetails = body.userScholarshipDetails.map((detail) => {
        return {
          ...detail,
          amount: detail.amount || '0',
        };
      });
      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserScholarshipDetails: {
                update: {
                  where: {
                    id: scholarDetails[0].id,
                  },
                  data: {
                    name: scholarDetails[0].name,
                    scholarshipDecs: scholarDetails[0].scholarshipDecs,
                    amount: scholarDetails[0].amount || '0',

                    issuedBy: scholarDetails[0].issuedBy,
                    statusCode: scholarDetails[0].statusCode,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userGoogleCertificationDetails) {
      const googleCertDetails = body.userGoogleCertificationDetails.map(
        (detail) => {
          return {
            ...detail,
            issuedAt: new Date(detail.issuedAt),
          };
        },
      );

      return this.prismaService.userProfile.update({
        where: {
          userId,
        },
        data: {
          UserProfessionalDetail: {
            update: {
              UserGoogleCertificationDetails: {
                update: {
                  where: {
                    id: googleCertDetails[0].id,
                  },
                  data: {
                    issuedAt: googleCertDetails[0].issuedAt,

                    title: googleCertDetails[0].title,
                    certificateURL: googleCertDetails[0].certificateURL,
                    statusCode: googleCertDetails[0].statusCode,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userScopusDetails) {
      const scopusDetails = body.userScopusDetails.map((detail) => {
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
              UserScopusDetails: {
                update: {
                  where: {
                    id: scopusDetails[0].id,
                  },
                  data: {
                    issuedAt: scopusDetails[0].issuedAt,
                    paperTitle: scopusDetails[0].paperTitle,
                    scopusUrl: scopusDetails[0].scopusUrl,
                    statusCode: scopusDetails[0].statusCode,
                    updatedAt: new Date(),
                  },
                },
              },
            },
          },
        },
      });
    } else if (body.userHindexDetails) {
      const HindexDetails = body.userHindexDetails.map((detail) => {
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
              UserHindexDetails: {
                update: {
                  where: {
                    id: HindexDetails[0].id,
                  },
                  data: {
                    issuedAt: HindexDetails[0].issuedAt,
                    title: HindexDetails[0].title,
                    indexUrl: HindexDetails[0].indexUrl,
                    statusCode: HindexDetails[0].statusCode,
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

  public async getProfileDetails(userId: string): Promise<
    UserProfile & {
      organisationId: number;
      Organisation: {
        fullName: string;
        id: number;
        logo: string;
      };
    }
  > {
    const [user, orgData] = await Promise.all([
      this.prismaService.userProfile.findUnique({
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
              Experiences: {
                where: {
                  statusCode: 1,
                },
                include: {
                  Organisation: {
                    select: {
                      City: {
                        select: {
                          fullName: true,
                        },
                      },
                      fullName: true,
                    },
                  },
                },
              },
              UserCertificateDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserAwardsDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserTrainingDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserPublicationDetails: true,
              UserPatentDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserHobbies: true,
              UserCurriculumDetails: true,
              UserScholarshipDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserGoogleCertificationDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserScopusDetails: {
                where: {
                  statusCode: 1,
                },
              },
              UserHindexDetails: {
                where: {
                  statusCode: 1,
                },
              },
            },
          },
        },
      }),

      this.prismaService.organisationRecruiters.findFirst({
        where: {
          userId,
        },
        select: {
          Organisation: {
            select: {
              id: true,
              fullName: true,
              logo: true,
            },
          },
        },
      }),
    ]);
    return {
      ...user,
      organisationId: orgData ? orgData.Organisation.id : undefined,
      Organisation: orgData
        ? {
            fullName: orgData.Organisation.fullName,
            id: orgData.Organisation.id,
            logo: orgData.Organisation.logo,
          }
        : undefined,
    };
  }

  public async searchForUserNames(
    text: string,
    page: number,
    limit: number,
  ): Promise<SearchUsersByNameDto[]> {
    const splittedText = text.split(' ');
    const users = await this.prismaService.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              startsWith: splittedText.length > 1 ? splittedText[0] : text,
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              startsWith: splittedText.length > 1 ? splittedText[1] : text,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        UserProfile: {
          select: {
            photoUrl: true,
            gender: true,
            UserProfessionalDetail: {
              select: {
                Experiences: {
                  where: {
                    isCurrent: true,
                  },
                  select: {
                    designation: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      take: limit,
      skip: page * limit,
    });

    const searchData: SearchUsersByNameDto[] = users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.UserProfile ? user.UserProfile.photoUrl : undefined,
      gender: user.UserProfile ? user.UserProfile.gender : undefined,
      designation:
        user.UserProfile?.UserProfessionalDetail?.Experiences[0]?.designation,
    }));
    return searchData;
  }
}
