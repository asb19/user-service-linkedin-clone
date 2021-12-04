import { Organisation } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganisationCreateDetailsDto } from 'src/user-profile/dto/userOtherDetails.dto';

@Injectable()
export class OrganisationService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOrganisation(
    body: OrganisationCreateDetailsDto,
  ): Promise<Organisation> {
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
    } = body;

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
    if (body.type && body.type.toLowerCase() === 'educational') {
      data['isInstitute'] = true;
    }
    if (body.type && body.type.toLowerCase() === 'noneducational') {
      data['isInstitute'] = false;
    }

    console.log(data);
    return this.prismaService.organisation.create({
      data: { ...data },
    });
  }

  // public async getOrganisationdetails() {
  //   return await this.prismaService.organisation.findMany({});
  // }
}
