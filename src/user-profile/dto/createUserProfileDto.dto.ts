import { Type } from 'class-transformer';
import {
  UserEducationDetailsDto,
  UserProfileDto,
} from './userOtherDetails.dto';

export class CreateUserProfileDto {
  @Type(() => UserProfileDto)
  userProfileDetails: UserProfileDto;

  @Type(() => UserEducationDetailsDto)
  userEducationDetails: UserEducationDetailsDto[];
}
