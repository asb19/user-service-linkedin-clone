/* eslint-disable prettier/prettier */
import { Organisation } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';
import {
  GetOrganisation,
  GetOrganisations,
} from './dto/getOrganisationResponseDto.dto';
import { OrganisationService } from './organisation.service';

@ApiTags('Organisation')
@Controller('organisation')
@ApiBearerAuth('XYZ')
export class OrganisationController {
  OrganisationService: any;
  public constructor(
    private readonly organisationService: OrganisationService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  private async createOrganisation(
    @Body() body: CreateOrganisationDto,
    @Req() req,
  ): Promise<GetOrganisation> {
    const organisation = await this.organisationService.createOrganisation(
      body,
      req.user.id,
    );
    return {
      status: true,
      message: 'organisation created successfully',
      data: organisation,
    };
  }

  @UseGuards(AuthGuard)
  @Put('/edit/:id')
  private async editOrganisation(
    @Body() body: CreateOrganisationDto,
    @Param('id') id: string,
  ): Promise<GetOrganisation> {
    const organisation = await this.organisationService.editOrganisationDetails(
      body,
      parseInt(id),
    );
    return {
      status: true,
      message: 'organisation updated successfully',
      data: organisation,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getorganisation/:id')
  private async getOrganisation(
    @Param('id') id: string,
  ): Promise<GetOrganisation> {
    const organisationDetails =
      await this.organisationService.getOrganisationDetails(parseInt(id));
    return {
      status: true,
      message: 'got organisation details successfully',
      data: organisationDetails,
    };
  }

  @Get('/getorganisations/')
  @ApiQuery({ name: 'type', enum: ['institute', 'company'] })
  private async getOrganisations(
    @Query() query: { type: string },
  ): Promise<GetOrganisations> {
    const organisationDetails = await this.organisationService.getOrganisations(
      query.type,
    );
    return {
      status: true,
      message: 'got organisations',
      data: organisationDetails,
    };
  }
}
