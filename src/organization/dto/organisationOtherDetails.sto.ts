import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable prettier/prettier */
export class OrganisationCreateDetailsDto {
  @ApiProperty()
  public id?: string;
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
export class OrgAwardsDetailsDto {
  @ApiProperty()
  id?: string;
  title: string;
  issuedBy: string;
  statusCode?: number;
  issuedDate: string;
  awardsDescription?: string;
  mediaUrls?: string[];
}

export class OrgTrainingDetailsDto {
  @ApiProperty()
  id?: string;
  title: string;
  organizer: string;
  statusCode?: number;
  startDate: string;
  endDate: string;
  trainingDecs?: string;
  mediaUrls?: string[];
}

export class OrgContactDetailsDto {
  @ApiProperty()
  id?: string;
  emailId: string;
  altEmailId: string;
  contactNumber: string;
  altContactNum: string;
  websiteUrl: string;
}
export class OrgEventDetailsDto {
  @ApiProperty()
  id?: string;
  title: string;
  date: string;
  eventUrl: string;
  statusCode?: number;
  desc: string;
}
export class OrgCourseDetailsDto {
  @ApiProperty()
  id?: string;
  title: string;
  affiliatedTo?: string;
  mediaUrls: string[];
  statusCode?: number;
}
