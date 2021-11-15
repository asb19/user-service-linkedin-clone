import { Type } from 'class-transformer';
import {
  UserEducationDetailsDto,
  UserExperienceDetailsDto,
  UserProfessionalDetailsDto,
  UserProfileDto,
} from './userOtherDetails.dto';

export class CreateUserProfileDto {
  @Type(() => UserProfileDto)
  userProfileDetails: UserProfileDto;

  @Type(() => UserEducationDetailsDto)
  userEducationDetails: UserEducationDetailsDto[];

  @Type(() => UserProfessionalDetailsDto)
  userProfessionalDetails: UserProfessionalDetailsDto;

  @Type(() => UserExperienceDetailsDto)
  userExperienceDetails: UserExperienceDetailsDto[];
}
