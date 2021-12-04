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
  [x: string]: any;
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
  public type: string;
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

export class UserCertificateDetailsDto {
  id?: string;
  certificateName: string;
  issuedBy: string;
  licenceNumber: string;
  issuedAt?: string;
  certificateURL: string;

}

export class UserAwardsDetailsDto {
  id?: string;
  title: string;
  issuedBy: string;
  issuedDate: string;
  awardsDescription?: string;
  mediaUrls?: string[];

}

export class UserTrainingDetailsDto {
  id?: string;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  trainingDecs?: string;
  mediaUrls?: string[];
}
export class OrganisationCreateDetailsDto {
  [x: string]: any;
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
  public type: string;
}
