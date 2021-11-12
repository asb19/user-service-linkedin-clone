import { GENDER } from '.prisma/client';

export class UserEducationDetailsDto {
  public degreeOrDiploma: string;
  public field: string;
  public fromTime: string;
  public endTime: string;
  public description: string;
  public mediaUrls: string[];
}

export class UserProfileDto {
  photoUrl?: string;
  dob?: string;
  gender?: GENDER;
  adhaarNo?: string;
  passportNo?: string;
  currentLocationId?: number;
  homeLocationId?: number;
  preferredLocations?: number[];
}
