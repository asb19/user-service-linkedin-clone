/* eslint-disable prettier/prettier */
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
export class OrgAwardsDetailsDto {
    id?: string;
    title: string;
    issuedBy: string;
    issuedDate: string;
    awardsDescription?: string;
    mediaUrls?: string[];
}

export class OrgTrainingDetailsDto {
    id?: string;
    title: string;
    organizer: string;
    startDate: string;
    endDate: string;
    trainingDecs?: string;
    mediaUrls?: string[];
}

export class OrgContactDetailsDto{
    id?: string
    emailId:   string;
    altEmailId:   string;
    contactNumber:   string;
    altContactNum:   string;
    websiteUrl:      string;

}
export class OrgCourseDetailsDto{
    id?: string
    title: string;
    affiliatedTo?: string;
    mediaUrls : string[];


}
