/* eslint-disable prettier/prettier */
import { Organisation } from '.prisma/client';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';
import { GetOrganisation } from './dto/getOrganisationResponseDto.dto';
import { OrganisationService } from './organisation.service';

@ApiTags('Organisation')
@Controller('organisation')
export class OrganisationController {
  OrganisationService: any;
  public constructor(
    private readonly organisationService: OrganisationService,
  ) { }

  @Post('/create')
  private async createOrganisation(
    @Body() body: CreateOrganisationDto,
  ): Promise<GetOrganisation> {
    const organisation = await this.organisationService.createOrganisation(body);
    return {
      status: true,
      message: "organisation created successfully",
      data: organisation
    }
  }

  @Put('/edit/:id')
  private async editOrganisation(
    @Body() body: CreateOrganisationDto,
    @Param('id') id: string,
  ): Promise<GetOrganisation> {
    const organisation = await this.organisationService.editOrganisationDetails(body, parseInt(id))
    return {
      status: true,
      message: "organisation updated successfully",
      data: organisation
    }
  }

  @Get('/getorganisation/:id')
  private async getOrganisation(
    @Param('id') id: string,
  ): Promise<GetOrganisation> {
    const organisationDetails = await this.organisationService.getOrganisationDetails(parseInt(id));
    return {
      status: true,
      message: "got organisation details successfully",
      data: organisationDetails
    }
  }
}
