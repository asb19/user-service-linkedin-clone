import { ResponseDto } from 'src/common/dto/response.dto';

export class FetchConnectionsDto {
  public connectionId: string;
  public photoUrl: string;
  public name: string;
}

export class FetchPageFollowDto {
  public orgId: number;
  public logo: string;
  public name: string;
}

export class FetchPeopleOrganisationDto {
  public designation: string;
  public photoUrl: string;
  public name: string;
  public connectionStatus: string;
  public isCurrent: boolean;
}

export class FetchConnectionresponseDto extends ResponseDto {
  public data: FetchConnectionsDto[];
}

export class FetchPageFollowresponseDto extends ResponseDto {
  public data: FetchPageFollowDto[];
}

export class FetchPeopleResponseDto extends ResponseDto {
  public data: FetchPeopleOrganisationDto[];
}
