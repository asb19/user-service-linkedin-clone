/* eslint-disable prettier/prettier */
import { Organisation } from '.prisma/client';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  OrganisationService: any;
  public constructor(
    private readonly organisationService: OrganisationService,
  ) { }

  @Post('/create')
  private async createOrganisation(
    @Body() body: CreateOrganisationDto,
  ): Promise<Organisation> {
    return await this.organisationService.createOrganisation(body);
  }

  @Put('/edit/:id')
  private async editOrganisation(
    @Body() body: CreateOrganisationDto,
    @Param('id') id: string,
  ): Promise<Organisation> {
    return await this.organisationService.editOrganisationDetails(body, parseInt(id))
  }

  @Get('/getorganisation/:id')
  private async getOrganisation(
    @Param('id') id: string,
  ): Promise<Organisation> {
    return await this.organisationService.getOrganisationDetails(parseInt(id));
  }
}
