import { UserProfile } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateUserProfileDto } from './dto/createUserProfileDto.dto';
import { GetUserProfile } from './dto/getUserProfileResponse.dto';
import { UserProfileService } from './user-profile.service';

@ApiTags('UserProfile')
@Controller('userprofile')
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
  private async GetDetails(@Req() req): Promise<GetUserProfile> {
    const userProfile = await this.userProfileService.getProfileDetails(
      req.user.id,
    );
    return {
      status: true,
      message: 'got profile data',
      data: userProfile,
    };
  }
}
