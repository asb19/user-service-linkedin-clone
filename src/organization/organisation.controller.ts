/* eslint-disable prettier/prettier */
import { Organisation, OrganisationRecruiters } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginationdto } from 'src/common/dto/pagination.dto';
import { AuthGuard } from 'src/guards/AuthGuard';
import { SearchQueryDto } from 'src/user-profile/dto/searchQuery.dto';
import { CreateOrganisationDto } from './dto/createOrganisationDto.dto';
import {
  GetOrganisation,
  GetOrganisations,
  GetRecruiters,
} from './dto/getOrganisationResponseDto.dto';
import { InviteToOrganisationDto } from './dto/invite.dto';
import { AdminListResponseDto } from './dto/orgAdmins.dto';
import {
  OrganisationDeleteReviewResponseDto,
  OrganisationReviewDto,
  OrganisationReviewResponseDto,
  ReviewListDto,
} from './dto/orgReviewDto.dto';
import { RemoveAdminResponseDto } from './dto/removeAdmin.dto';
import { SearchOrganizationsResponseDto } from './dto/serachOrganizations.dto';
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
      message: 'invite sent',
      data: invite,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/orgAdmins')
  @ApiQuery({ name: 'orgid', example: '25' })
  private async adminsFetch(
    @Query() query: { orgid: string },
    @Req() req,
  ): Promise<AdminListResponseDto> {
    const adminData = await this.organisationService.getAdminsList(
      parseInt(query.orgid),
      req.user.id,
    );
    return {
      status: true,
      message: 'invites ent',
      data: adminData,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/removeAdminAccess/:id')
  @ApiQuery({ name: 'orgid', example: '25' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'please provide the id fetched from get orgAdmins api',
  })
  private async removeAdmin(
    @Query() query: { orgid: string; email: string },
    @Req() req,
    @Param('id') id: string,
  ): Promise<RemoveAdminResponseDto> {
    const invite = await this.organisationService.removeAsAdmin(
      parseInt(query.orgid),
      req.user.id,
      id,
    );
    return {
      status: true,
      message: 'removed from admin list',
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
    @Param('id') id: string,
    @Query() query: Paginationdto,
    @Req() req,
  ): Promise<ReviewListDto> {
    console.log(query);
    const review = await this.organisationService.getReviewListdata(
      parseInt(id),
      query.page,
      query.limit,
      req.user.id,
    );
    return {
      status: true,
      message: 'organisation review fetched successfully',
      data: review,
    };
  }

  @UseGuards(AuthGuard)
  @Delete('/review/:id')
  private async deleteReview(
    @Param('id') id: string,
    @Req() req,
  ): Promise<OrganisationDeleteReviewResponseDto> {
    await this.organisationService.deleteUserReview(req.user.id, id);
    return {
      status: true,
      message: 'organisation review deleted successfully',
      data: 'review deleted',
    };
  }

  @UseGuards(AuthGuard)
  @Get('/search')
  private async SearchOrganization(
    @Req() req,
    @Query() query: SearchQueryDto,
  ): Promise<SearchOrganizationsResponseDto> {
    const searches = await this.organisationService.searchOrganizations(
      query.text,
      query.page || 0,
      query.limit || 10,
    );
    return {
      status: true,
      message: 'got searched data',
      data: searches,
    };
  }
}
