/* eslint-disable prettier/prettier */
import { Organisation } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';

@Injectable()
export class OrganisationService {
  public constructor(private readonly prismaService: PrismaService) { }

  public async createOrganisation(
    body: CreateOrganisationDto,
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
            ...details
          }
        })
        : undefined




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

    const contactDetails =
      body.orgContactDetails
        ? { ...body.orgContactDetails }
        : undefined



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
      const organisation = await this.prismaService.organisation.create({
        data: {
          ...data,



        },
      });
      return organisation;
    } else if (body.organisationDetails.id) {

      return this.prismaService.organisation.update({
        where: {
          id: body.organisationDetails.id
        },
        data: {
          OrgAwardsDetails: { create: awardDetails },
          OrgTrainingDetails: { create: trainingDetails },
          OrgCourseDetails: { create: courseDetails },
          OrgContactDetails: { create: contactDetails },


          //OrgContactDetails:{ create: contactDetails},

        }
      })
    }

  }

  public async editOrganisationDetails(
    body: CreateOrganisationDto,
    id: number
  ): Promise<Organisation> {
    const organisation = await this.prismaService.organisation.findUnique({
      where: { id },
    });

    if (!organisation) {
      throw new NotFoundException('Organisation not found to edit details');
    }

    if (body.organisationDetails) {
      const {
        fullName,
        location,
        zipcode,
        affiliation,
        description,
        logo,

        estaclishedDate,

      } = body.organisationDetails;
      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          fullName,
          location,
          zipcode,
          affiliation,
          description,
          logo,

          estaclishedDate,

        }
      });
    } else if (body.orgAwardsDetails) {
      //TODO : edit award details
      const awardDet = body.orgAwardsDetails.map((detail) => {
        return {
          ...detail,
          issuedDate: new Date(detail.issuedDate),
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
                issuedDate: awardDet[0].issuedDate,

                title: awardDet[0].title,
                issuedBy: awardDet[0].issuedBy,
                statusCode: awardDet[0].statusCode,
                awardsDescription: awardDet[0].awardsDescription
                  ? awardDet[0].awardsDescription
                  : undefined,
              },
            },
          }
        }
      });
    } else if (body.orgTrainingDetails) {
      const trainingDet = body.orgTrainingDetails.map((detail) => {
        return {
          ...detail,
          endDate: new Date(detail.endDate),
          startDate: new Date(detail.startDate),
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
              },
            },
          },
        }
      });

    } else if (body.orgCourseDetails) {
      const courseDetails = body.orgCourseDetails.map((details) => {
        return {
          ...details,
        }
      })

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
                title: courseDetails[0].title,
                affiliatedTo: courseDetails[0].affiliatedTo,
                statusCode: courseDetails[0].statusCode,
              }
            }
          }
        }

      })
    } else if (body.orgContactDetails) {
      const contactDetails = { ...body.orgContactDetails }

      return this.prismaService.organisation.update({
        where: {
          id,
        },
        data: {
          OrgContactDetails: {
            update: {


              emailId: contactDetails.emailId,
              altEmailId: contactDetails.altEmailId,
              contactNumber: contactDetails.contactNumber,
              altContactNum: contactDetails.altContactNum,
              websiteUrl: contactDetails.websiteUrl,
            }

          }
        }
      })
    }


  }

  public async getOrganisationDetails(
    id: number
  ): Promise<Organisation> {
    const organisation = await this.prismaService.organisation.findUnique({
      where: {
        id
      },
      include: {


        OrgAwardsDetails: {
          where: {
            statusCode: {
              gt: 0,
            }
          }
        },
        OrgTrainingDetails: {
          where: {
            statusCode: {
              gt: 0,
            }
          }
        },
        OrgCourseDetails: {
          where: {
            statusCode: {
              gt: 0,
            }
          }
        },
        OrgContactDetails: true,



      },
    });
    if (!organisation) {
      throw new NotFoundException('Organisation not found');

    }
    return organisation;
  }

}
