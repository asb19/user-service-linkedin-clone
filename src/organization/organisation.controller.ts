/* eslint-disable prettier/prettier */
import { Organisation, OrganisationRecruiters } from '.prisma/client';
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
import { Paginationdto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';
import {
  GetOrganisation,
  GetOrganisations,
  GetRecruiters,
} from './dto/getOrganisationResponseDto.dto';
import { InviteToOrganisationDto } from './dto/invite.dto';
import {
  OrganisationReviewDto,
  OrganisationReviewResponseDto,
  ReviewListDto,
} from './dto/orgReviewDto.dto';
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

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Post('/invite')
  @ApiQuery({ name: 'orgid', example: '25' })
  @ApiQuery({ name: 'email', example: 'amir@gmail.com' })
  private async inviteToOrganisation(
    @Query() query: { orgid: string; email: string },
  ): Promise<InviteToOrganisationDto> {
    const invite = await this.organisationService.inviteUser(
      parseInt(query.orgid),
      query.email,
    );
    return {
      status: true,
      message: 'invites ent',
      data: invite,
    };
  }

  @Get('/recruiters')
  private async getRecruiters(
    @Query() query: { orgid: string },
  ): Promise<GetRecruiters> {
    const recruiters = await this.organisationService.getRecruitersFromOrgId(
      parseInt(query.orgid),
    );
    return {
      status: true,
      message: 'got recruiters',
      data: recruiters,
    };
  }

  @Get('/inviteeData')
  @ApiQuery({ name: 'email', example: 'amir@gmail.com' })
  private async getInvitee(
    @Query() query: { email: string },
  ): Promise<InviteToOrganisationDto> {
    const invitee = await this.organisationService.getInviteeData(query.email);
    return {
      status: true,
      message: 'got invitee data',
      data: invitee,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/review')
  private async createOrganisationReview(
    @Body() body: OrganisationReviewDto,
  ): Promise<OrganisationReviewResponseDto> {
    const review = await this.organisationService.createOrUpdateReview(body);
    return {
      status: true,
      message: 'organisation review created successfully',
      data: review,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/review/:id')
  private async getOrganisationReview(
    @Param() id: string,
    @Query() query: Paginationdto,
  ): Promise<ReviewListDto> {
    const review = await this.organisationService.getReviewListdata(
      parseInt(id),
      query.page,
      query.limit,
    );
    return {
      status: true,
      message: 'organisation review fetched successfully',
      data: review,
    };
  }
}
