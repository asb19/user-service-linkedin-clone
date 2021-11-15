import { GENDER } from '.prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UserEducationDetailsDto {
  public instituteId?: number;
  public id?: string;
  public degreeOrDiploma: string;
  public field: string;
  public fromTime: string;
  public endTime: string;
  public description: string;
  public mediaUrls: string[];
  public Institute?: OrganisationDetailsDto;
}

export class OrganisationDetailsDto {
  fullName: string;
  address?: string;
  cityId: number;
  zipcode?: string;
  affiliation?: string;
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
  organisationId?: number;
  industry: string;
  fromTime?: string;
  endTime?: string;
  mediaUrls?: string[];
  isCurrent: boolean;
  Organisation?: OrganisationDetailsDto;
}
export class UserProfileDto {
  photoUrl?: string;

  @IsNotEmpty()
  dob: string;

  @IsNotEmpty()
  gender?: GENDER;

  adhaarNo?: string;
  passportNo?: string;
  currentLocationId?: number;
  homeLocationId?: number;
  preferredLocations?: number[];
}
