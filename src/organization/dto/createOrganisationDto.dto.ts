/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  OrganisationCreateDetailsDto,
  OrgAwardsDetailsDto,
  OrgContactDetailsDto,
  OrgCourseDetailsDto,
  OrgEventDetailsDto,
  OrgTrainingDetailsDto,
} from './organisationOtherDetails.sto';
export class CreateOrganisationDto {
  @ApiProperty()
  @Type(() => OrganisationCreateDetailsDto)
  organisationDetails: OrganisationCreateDetailsDto;

  @Type(() => OrgAwardsDetailsDto)
  orgAwardsDetails: OrgAwardsDetailsDto[];

  @Type(() => OrgTrainingDetailsDto)
  orgTrainingDetails: OrgTrainingDetailsDto[];

  @Type(() => OrgCourseDetailsDto)
  orgCourseDetails: OrgCourseDetailsDto[];

  @Type(() => OrgContactDetailsDto)
  orgContactDetails: OrgContactDetailsDto;

  @Type(() => OrgEventDetailsDto)
  orgEventDetails: OrgEventDetailsDto[];
}
