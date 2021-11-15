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
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateUserProfileDto } from './dto/createUserProfileDto.dto';
import { UserProfileService } from './user-profile.service';

@Controller('userprofile')
export class UserProfileController {
  public constructor(private readonly userProfileService: UserProfileService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  private async CreateProfile(
    @Body() body: CreateUserProfileDto,
    @Req() req,
  ): Promise<UserProfile> {
    return await this.userProfileService.createProfile(body, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Put('/edit')
  private async EditProfile(
    @Body() body: CreateUserProfileDto,
    @Req() req,
  ): Promise<UserProfile> {
    return await this.userProfileService.editProfileDetails(body, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get('/getProfileDetails')
  private async GetDetails(@Req() req): Promise<UserProfile> {
    return await this.userProfileService.getProfileDetails(req.user.id);
  }
}
