import { City, GENDER } from '.prisma/client';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserEducationDetailsDto {
  @ApiProperty()
  public instituteId?: number;
  public id?: string;
  public degreeOrDiploma: string;
  public field: string;
  public fromTime: string;
  public endTime: string;
  public description: string;
  public mediaUrls: string[];
  public Institute?: OrganisationDetailsDto;
  public statusId?: number;
  public isCurrent?: boolean;
}

export class OrganisationDetailsDto {
  @ApiProperty()
  public id?: number;
  public fullName: string;
  public location?: string;
  public cityId: number;
  public zipcode?: string;
  public estaclishedDate?: Date;
  public affiliation?: string;
  public logo?: string;
  public description?: string;
  public isInstitute: boolean;
  public isVerified: boolean;
  public type?: string;
}

export class UserProfessionalDetailsDto {
  id?: string;
  description?: string;
  keySkills: string;
}

export class UserExperienceDetailsDto {
  id?: string;
  professionalId: string;
  designation: string;
  description?: string;
  organisationId?: number;
  industry: string;
  fromTime?: string;
  endTime?: string;
  mediaUrls?: string[];
  statusCode?: number;
  isCurrent: boolean;
  Organisation?: OrganisationDetailsDto;
}
export class UserProfileDto {
  photoUrl?: string;

  @IsNotEmpty()
  dob: string;

  @ApiProperty({ enum: GENDER })
  @IsNotEmpty()
  gender?: GENDER;

  adhaarNo?: string;
  passportNo?: string;
  currentLocationId?: number;
  homeLocationId?: number;
  preferredLocations?: number[];
  passportPlaceAndCountryOfIssue?: string;
  passportValidity?: string;
  mediaUrls?: string[];
  firstName?: string;
  lastName?: string;
}

export class UserCertificateDetailsDto {
  id?: string;
  certificateName: string;
  issuedBy: string;
  licenceNumber: string;
  startDate?: string;
  endDate?: string;
  statusCode?: number;
  certificateURL: string;
}

export class UserAwardsDetailsDto {
  id?: string;
  title: string;
  issuedBy: string;
  issuedDate: string;
  awardsDescription?: string;
  statusCode?: number;
  mediaUrls?: string[];
}

export class UserTrainingDetailsDto {
  id?: string;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  trainingDecs?: string;
  statusCode?: number;
  mediaUrls?: string[];
}

export class UserPublicationDetailsDto {
  id?: string;
  scopusUrl?: string;
  sciUrl?: string;
  gScholarUrl?: string;
}

export class UserPatentDetailsDto {
  id?: string;
  IPRTitle: string;
  title?: string;
  patentDecs?: string;
  statusCode?: number;
  isApproved?: boolean;
  date?: string;
}

export class UserHobbiesDto {
  id?: string;
  hobbies: string[];
  mediaUrls: string[];
  statusCode?: number;
}

export class UserCurriculumDetailsDto {
  id?: string;
  activities: string[];
  mediaUrls: string[];
  statusCode?: number;
}

export class UserScholarshipDetailsDto {
  id?: number;
  name: string;
  scholarshipDecs?: string;
  amount?: string;
  statusCode?: number;
  issuedBy: string;
}

export class UserGoogleCertificationDetailsDto {
  id?: string;
  title: string;
  issuedAt?: string;
  certificateURL?: string;
  statusCode?: number;
}

export class UserScopusDetailsDto {
  id?: number;
  paperTitle: string;
  issuedAt?: string;
  statusCode?: number;
  scopusUrl?: string;
}

export class UserHindexDetailsDto {
  id?: number;
  title: string;
  issuedAt?: string;
  indexUrl?: string;
  statusCode?: number;
}
