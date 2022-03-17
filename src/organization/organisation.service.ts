/* eslint-disable prettier/prettier */
import {
  Organisation,
  OrganisationInvites,
  OrganisationRecruiters,
} from '.prisma/client';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { resourceLimits } from 'worker_threads';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';
import {
  OrganisationReviewDto,
  OrganisationReviewListDto,
} from './dto/orgReviewDto.dto';

@Injectable()
export class OrganisationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOrganisation(
    body: CreateOrganisationDto,
    userId: string,
  ): Promise<Organisation> {
    const awardDetails =
      body.orgAwardsDetails && body.orgAwardsDetails.length > 0
        ? body.orgAwardsDetails.map((detail) => {
            return {
              ...detail,
              issuedDate: new Date(detail.issuedDate),
            };
          })
        : undefined;

    const courseDetails =
      body.orgCourseDetails && body.orgCourseDetails.length > 0
        ? body.orgCourseDetails.map((details) => {
            return {
              ...details,
            };
          })
        : undefined;

    const eventDetails =
      body.orgEventDetails && body.orgEventDetails.length > 0
        ? body.orgEventDetails.map((detail) => {
            return {
              ...detail,
              date: new Date(detail.date),
            };
          })
        : undefined;

    //took tarining object from body....
    const trainingDetails =
      body.orgTrainingDetails && body.orgTrainingDetails.length > 0
        ? body.orgTrainingDetails.map((detail) => {
            return {
              ...detail,
              startDate: new Date(detail.startDate), //change type string -> date
              endDate: new Date(detail.endDate),
            };
          })
        : undefined;

    const contactDetails = body.orgContactDetails
      ? { ...body.orgContactDetails }
      : undefined;

    if (!body.organisationDetails.id) {
      const {
        fullName,
        location,
        zipcode,
        affiliation,
        description,
        logo,
        type,
        estaclishedDate,
        isVerified,
        cityId,
      } = body.organisationDetails;
      const data = {
        fullName,
        location,
        zipcode,
        affiliation,
        description,
        logo,
        estaclishedDate,
        isVerified,
        cityId,
      };
      if (type && type.toLowerCase() === 'educational') {
        data['isInstitute'] = true;
      }
      if (type && type.toLowerCase() === 'noneducational') {
        data['isInstitute'] = false;
      }

      const alreadyOrg =
        await this.prismaService.organisationRecruiters.findFirst({
          where: {
            userId,
          },
        });
      if (alreadyOrg)
        throw new BadRequestException('already a member of an organisation');
      const organisation = await this.prismaService.organisation.create({
        data: {
          ...data,
          estaclishedDate: estaclishedDate
            ? new Date(estaclishedDate)
            : undefined,
        },
      });

      await this.prismaService.organisationRecruiters.create({
        data: {
          orgId: organisation.id,
          userId,
          role: 'OWNER',
          status: 1,
        },
      });
      return organisation;
    }

    return this.prismaService.organisation.update({
      where: {
        id: body.organisationDetails.id,
      },
      data: {
        OrgAwardsDetails: { create: awardDetails },
        OrgTrainingDetails: { create: trainingDetails },
        OrgCourseDetails: { create: courseDetails },
        OrgContactDetails: { create: contactDetails },
        OrgEventDetails: { create: eventDetails },

        //OrgContactDetails:{ create: contactDetails},
      },
    });
  }

  public async editOrganisationDetails(
    body: CreateOrganisationDto,
    id: number,
  ): Promise<Organisation> {
    const organisation = await this.prismaService.organisation.findUnique({
      where: { id },
    });

    if (!organisation) {
      throw new NotFoundException('Organisation not found to edit details');
    }

    if (body.organisationDetails && body.orgContactDetails) {
      const {
        fullName,
        location,
        zipcode,
        affiliation,
        description,
        logo,
        cityId,

        estaclishedDate,
      } = body.organisationDetails;
      const contactDetails = { ...body.orgContactDetails };

      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          fullName: fullName || undefined,
          location: location || undefined,
          zipcode: zipcode || undefined,
          affiliation: affiliation || undefined,
          description: description || undefined,
          cityId: cityId || undefined,
          logo: logo || undefined,

          estaclishedDate: estaclishedDate
            ? new Date(estaclishedDate)
            : undefined,
          updatedAt: new Date(),
          OrgContactDetails: {
            update: {
              emailId: contactDetails.emailId || undefined,
              altEmailId: contactDetails.altEmailId || undefined,
              contactNumber: contactDetails.contactNumber || undefined,
              altContactNum: contactDetails.altContactNum || undefined,
              websiteUrl: contactDetails.websiteUrl || undefined,
              updatedAt: new Date(),
            },
          },
        },
      });
    }
    if (body.orgAwardsDetails) {
      //TODO : edit award details
      const awardDet = body.orgAwardsDetails.map((detail) => {
        return {
          ...detail,
          issuedDate: detail.issuedDate
            ? new Date(detail.issuedDate)
            : undefined,
        };
      });
      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          OrgAwardsDetails: {
            update: {
              where: {
                id: awardDet[0].id,
              },
              data: {
                issuedDate: awardDet[0].issuedDate || undefined,

                title: awardDet[0].title || undefined,
                issuedBy: awardDet[0].issuedBy || undefined,
                statusCode: awardDet[0].statusCode == 0 ? 0 : undefined,
                awardsDescription: awardDet[0].awardsDescription
                  ? awardDet[0].awardsDescription
                  : undefined,
                updatedAt: new Date(),
              },
            },
          },
        },
      });
    }
    if (body.orgTrainingDetails) {
      const trainingDet = body.orgTrainingDetails.map((detail) => {
        return {
          ...detail,
          endDate: detail.endDate ? new Date(detail.endDate) : undefined,
          startDate: detail.startDate ? new Date(detail.startDate) : undefined,
        };
      });
      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          OrgTrainingDetails: {
            update: {
              where: {
                id: trainingDet[0].id,
              },
              data: {
                title: trainingDet[0].title,
                organizer: trainingDet[0].organizer,
                statusCode: trainingDet[0].statusCode,
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
      });
    }
    if (body.orgCourseDetails) {
      const courseDetails = body.orgCourseDetails.map((details) => {
        return {
          ...details,
        };
      });

      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          OrgCourseDetails: {
            update: {
              where: {
                id: courseDetails[0].id,
              },
              data: {
                title: courseDetails[0].title || undefined,
                affiliatedTo: courseDetails[0].affiliatedTo || undefined,
                statusCode: courseDetails[0].statusCode == 0 ? 0 : undefined,
                updatedAt: new Date(),
              },
            },
          },
        },
      });
    }
    if (body.orgContactDetails) {
      const contactDetails = { ...body.orgContactDetails };

      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          OrgContactDetails: {
            update: {
              emailId: contactDetails.emailId || undefined,
              altEmailId: contactDetails.altEmailId || undefined,
              contactNumber: contactDetails.contactNumber || undefined,
              altContactNum: contactDetails.altContactNum || undefined,
              websiteUrl: contactDetails.websiteUrl || undefined,
              updatedAt: new Date(),
            },
          },
        },
      });
    }
    if (body.orgEventDetails) {
      const eventDetails = body.orgEventDetails.map((detail) => {
        return {
          ...detail,
          date: detail.date ? new Date(detail.date) : undefined,
        };
      });
      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          OrgEventDetails: {
            update: {
              where: {
                id: eventDetails[0].id,
              },
              data: {
                title: eventDetails[0].title || undefined,
                eventUrl: eventDetails[0].eventUrl || undefined,
                desc: eventDetails[0].desc || undefined,
                date: eventDetails[0].date || undefined,
                statusCode: eventDetails[0].statusCode == 0 ? 0 : undefined,
                updatedAt: new Date(),
              },
            },
          },
        },
      });
    }
  }

  public async getOrganisationDetails(id: number): Promise<Organisation> {
    const organisation = await this.prismaService.organisation.findUnique({
      where: {
        id,
      },
      include: {
        OrgAwardsDetails: {
          where: {
            statusCode: 1,
          },
        },
        OrgTrainingDetails: {
          where: {
            statusCode: 1,
          },
        },
        OrgCourseDetails: {
          where: {
            statusCode: 1,
          },
        },
        OrgEventDetails: {
          where: {
            statusCode: 1,
          },
        },
        OrgContactDetails: true,
      },
    });
    if (!organisation) {
      throw new NotFoundException('Organisation not found');
    }
    return organisation;
  }

  public async getOrganisations(type: string): Promise<Organisation[]> {
    const organisations = this.prismaService.organisation.findMany({
      where: {
        isInstitute: type == 'institute' ? true : false,
        isVerified: true,
      },
      include: {
        City: {
          select: {
            fullName: true,
          },
        },
      },
    });

    return organisations;
  }

  public async getRecruitersFromOrgId(
    orgId: number,
  ): Promise<OrganisationRecruiters[]> {
    return await this.prismaService.organisationRecruiters.findMany({
      where: {
        orgId,
      },
    });
  }

  public async getInviteeData(userEmail: string): Promise<OrganisationInvites> {
    return await this.prismaService.organisationInvites.findFirst({
      where: {
        userEmail,
        status: 'pending',
      },
    });
  }

  public async inviteUser(
    orgId: number,
    userEmail: string,
  ): Promise<OrganisationInvites> {
    const user = await this.prismaService.organisationInvites.findFirst({
      where: {
        userEmail,
        orgId,
      },
    });

    if (user) throw new BadRequestException('already invited');
    return await this.prismaService.organisationInvites.create({
      data: {
        orgId,
        userEmail,
      },
    });
  }

  public async createOrUpdateReview(
    body: OrganisationReviewDto,
  ): Promise<OrganisationReviewDto> {
    if (body.id) {
      const userDetails =
        await this.prismaService.userProfessionalDetail.findUnique({
          where: {
            userId: body.userId,
          },
          select: {
            Experiences: {
              where: {
                statusCode: 1,
              },
              select: {
                designation: true,
              },
              take: 1,
            },
          },
        });

      return await this.prismaService.organisationReviews.create({
        data: {
          orgId: body.orgId,
          rating: body.rating,
          userId: body.userId,
          reviewTitle: body.reviewTitle,
          reviewText: body.reviewText,
          userDetail:
            userDetails.Experiences.length > 0
              ? userDetails.Experiences[0].designation
              : undefined,
        },
      });
    }

    const review = await this.prismaService.organisationReviews.update({
      where: {
        id: body.id,
      },
      data: {
        updatedAt: new Date(),
        rating: body.rating,
        reviewText: body.reviewText,
        reviewTitle: body.reviewTitle,
      },
    });
    return review;
  }

  public async getReviewListdata(
    orgId: number,
    page: number,
    limit: number,
    userId: string,
  ): Promise<OrganisationReviewListDto> {
    const average = await this.prismaService.organisationReviews.aggregate({
      where: {
        orgId,
      },
      _avg: {
        rating: true,
      },
    });

    const allReviews = await this.prismaService.organisationReviews.findMany({
      where: {
        orgId,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: page * limit,
    });
    const reviewList = allReviews.map((review) => ({
      ...review,
      editAccess: review.userId == userId,
    }));
    const data = {
      reviewList,
      rating: average ? average._avg : null,
    };
    return data;
  }

  //TODO: pending get invite list and accept invite
}
