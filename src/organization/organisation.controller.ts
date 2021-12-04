import { Organisation } from '.prisma/client';
import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { OrganisationCreateDetailsDto } from 'src/user-profile/dto/userOtherDetails.dto';
import { OrganisationService } from './organisation.service';

@Controller('organisation')
export class OrganisationController {
  OrganisationService: any;
  public constructor(
    private readonly organisationService: OrganisationService,
  ) {}

  @Post('/create')
  private async createOrganisation(
    @Body() body: OrganisationCreateDetailsDto,
  ): Promise<Organisation> {
    return await this.organisationService.createOrganisation(body);
  }

  // @Put('/edit')
  // private async editOrganisation(
  //   @Body() body: OrganisationDetailsDto,
  // ):Promise<Organisation>{

  // }

  // @Get('/getorganisation')
  // private async getOrganisation(@Req() req): Promise<Organisation> {
  //   return await this.organisationService.getOrganisationdetails();
  // }
}
