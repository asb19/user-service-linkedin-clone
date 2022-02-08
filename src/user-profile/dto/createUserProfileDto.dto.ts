import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  UserEducationDetailsDto,
  UserExperienceDetailsDto,
  UserProfessionalDetailsDto,
  UserProfileDto,
  UserCertificateDetailsDto,
  UserAwardsDetailsDto,
  UserTrainingDetailsDto,
  UserPublicationDetailsDto,
  UserPatentDetailsDto,
  UserHobbiesDto,
  UserCurriculumDetailsDto,
  UserScholarshipDetailsDto,
  UserGoogleCertificationDetailsDto,
  UserScopusDetailsDto,
  UserHindexDetailsDto,
} from './userOtherDetails.dto';

export class CreateUserProfileDto {
  @ApiProperty()
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
  userTrainingDetails: UserTrainingDetailsDto[];

  @Type(() => UserPublicationDetailsDto)
  userPublicationDetails: UserPublicationDetailsDto;

  @Type(() => UserPatentDetailsDto)
  userPatentDetails: UserPatentDetailsDto[];

  @Type(() => UserHobbiesDto)
  userHobbies: UserHobbiesDto;

  @Type(() => UserCurriculumDetailsDto)
  userCurriculumDetails: UserCurriculumDetailsDto;

  @Type(() => UserScholarshipDetailsDto)
  userScholarshipDetails: UserScholarshipDetailsDto[];

  @Type(() => UserGoogleCertificationDetailsDto)
  userGoogleCertificationDetails: UserGoogleCertificationDetailsDto[];

  @Type(() => UserScopusDetailsDto)
  userScopusDetails: UserScopusDetailsDto[];

  @Type(() => UserHindexDetailsDto)
  userHindexDetails: UserHindexDetailsDto[];
}
