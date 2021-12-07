/* eslint-disable prettier/prettier */
import { Type } from 'class-transformer';
import {
    OrganisationCreateDetailsDto,
    OrgAwardsDetailsDto,
    OrgContactDetailsDto,
    OrgCourseDetailsDto,
    OrgTrainingDetailsDto,
} from './organisationOtherDetails.sto';
export class CreateOrganisationDto {
    @Type(() => OrganisationCreateDetailsDto)
    organisationDetails: OrganisationCreateDetailsDto;

    @Type(() => OrgAwardsDetailsDto)
    orgAwardsDetails: OrgAwardsDetailsDto[];

    @Type(() => OrgTrainingDetailsDto)
    orgTrainingDetails: OrgTrainingDetailsDto[];

    @Type(() => OrgContactDetailsDto) 
    orgContactDetails: OrgContactDetailsDto[];
    
    @Type(() => OrgCourseDetailsDto)
    orgCourseDetails:OrgCourseDetailsDto[];
}