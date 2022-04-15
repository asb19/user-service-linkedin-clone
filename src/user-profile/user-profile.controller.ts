import { UserProfile } from '.prisma/client';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateUserProfileDto } from './dto/createUserProfileDto.dto';
import {
  GetUserProfile,
  GetUserProfileWithOtherDetailsDto,
} from './dto/getUserProfileResponse.dto';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { SearchResponseDto } from './dto/searchUsers.dto';
import { UserInviteOrgResponseDto } from './dto/userInvitedByOrg.dto';
import { UserProfileService } from './user-profile.service';

@ApiTags('UserProfile')
@Controller('userprofile')
@ApiBearerAuth('XYZ')
export class UserProfileController {
  public constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  private async CreateProfile(
    @Body() body: CreateUserProfileDto,
    @Req() req,
  ): Promise<GetUserProfile> {
    const userProfile = await this.userProfileService.createProfile(
      body,
      req.user.id,
    );
    return {
      status: true,
      message: 'created user profile details',
      data: userProfile,
    };
  }

  @UseGuards(AuthGuard)
  @Put('/edit')
  private async EditProfile(
    @Body() body: CreateUserProfileDto,
    @Req() req,
  ): Promise<GetUserProfile> {
    const userProfile = await this.userProfileService.editProfileDetails(
      body,
      req.user.id,
    );
    return {
      status: true,
      message: 'user profile successfully updated',
      data: userProfile,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getProfileDetails')
  private async GetDetails(
    @Req() req,
  ): Promise<GetUserProfileWithOtherDetailsDto> {
    const userProfile = await this.userProfileService.getProfileDetails(
      req.user.id,
    );
    return {
      status: true,
      message: 'got profile data',
      data: userProfile,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getUserDetails/:userId')
  private async GetUserDetails(
    @Req() req,
    @Param('userId') userId: string,
  ): Promise<GetUserProfileWithOtherDetailsDto> {
    const userProfile = await this.userProfileService.getProfileDetails(userId);
    return {
      status: true,
      message: 'got profile data',
      data: userProfile,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/getInvites')
  private async getInvites(
    @Req() req,
    @Query('email') email: string,
  ): Promise<UserInviteOrgResponseDto> {
    const invite = await this.userProfileService.getUserInvitesForOrg(
      email,
      req.user.id,
    );
    return {
      status: true,
      message: invite ? 'no invite data' : 'got invite data',
      data: invite,
    };
  }

  @UseGuards(AuthGuard)
  @Get('/search')
  private async SearchUsers(
    @Req() req,
    @Query() query: SearchQueryDto,
  ): Promise<SearchResponseDto> {
    const searches = await this.userProfileService.searchForUserNames(
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
