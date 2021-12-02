import { Type } from 'class-transformer';
import {
  UserEducationDetailsDto,
  UserExperienceDetailsDto,
  UserProfessionalDetailsDto,
  UserProfileDto,
  UserCertificateDetailsDto,
  UserAwardsDetailsDto,
  UserTrainingDetailsDto,
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

  @Type(() => UserCertificateDetailsDto)
  userCertificateDetails: UserCertificateDetailsDto[];

  @Type(() => UserAwardsDetailsDto)
  userAwardsDetails: UserAwardsDetailsDto[];

  @Type(() => UserTrainingDetailsDto)
  userTraingDetails: UserTrainingDetailsDto[];
}
