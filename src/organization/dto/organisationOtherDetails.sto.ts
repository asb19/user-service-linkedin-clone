import { ApiProperty } from '@nestjs/swagger';

/* eslint-disable prettier/prettier */
export class OrganisationCreateDetailsDto {
  @ApiProperty()
  public id?: number;
  @ApiProperty()
  public fullName: string;
  @ApiProperty()
  public location?: string;
  @ApiProperty()
  public cityId: number;
  @ApiProperty()
  public zipcode?: string;
  @ApiProperty()
  public estaclishedDate?: Date;
  @ApiProperty()
  public affiliation?: string;
  @ApiProperty()
  public logo?: string;
  @ApiProperty()
  public description?: string;
  @ApiProperty()
  public isInstitute: boolean;
  @ApiProperty()
  public isVerified: boolean;
  @ApiProperty()
  public type: string;
}
export class OrgAwardsDetailsDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  issuedBy: string;
  @ApiProperty()
  statusCode?: number;
  @ApiProperty()
  issuedDate: string;
  @ApiProperty()
  awardsDescription?: string;
  @ApiProperty()
  mediaUrls?: string[];
}

export class OrgTrainingDetailsDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  organizer: string;
  @ApiProperty()
  statusCode?: number;
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string;
  @ApiProperty()
  trainingDecs?: string;
  @ApiProperty()
  mediaUrls?: string[];
}

export class OrgContactDetailsDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  emailId: string;
  @ApiProperty()
  altEmailId: string;
  @ApiProperty()
  contactNumber: string;
  @ApiProperty()
  altContactNum: string;
  @ApiProperty()
  websiteUrl: string;
}
export class OrgEventDetailsDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  date: string;
  @ApiProperty()
  eventUrl: string;
  @ApiProperty()
  statusCode?: number;
  @ApiProperty()
  desc: string;
}
export class OrgCourseDetailsDto {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  affiliatedTo?: string;
  @ApiProperty()
  mediaUrls: string[];
  @ApiProperty()
  statusCode?: number;
}
