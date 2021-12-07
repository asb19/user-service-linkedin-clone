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
          OrgContactDetailsDto: {create:}
        }
      })
    }

  }

  public async editOrganisationDetails(
    body: CreateOrganisationDto,
    id: string
  ): Promise<Organisation> {
    const organisation = await this.prismaService.organisation.findUnique({
      where: { id: parseInt(id) },
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
          id: parseInt(id),
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
          id: parseInt(id),
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
          id: parseInt(id),
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

    }
  }

  public async getOrganisationDetails(
    id: string
  ): Promise<Organisation> {
    const organisation = await this.prismaService.organisation.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {


        OrgAwardsDetails: true,
        OrgTrainingDetails: true,
        OrgContactDetails:true,
      },
    });
    if (!organisation) {
      throw new NotFoundException('Organisation not found');

    }
    return organisation;
  }

}
