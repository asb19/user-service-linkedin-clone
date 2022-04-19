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

export class FetchConnectionresponseDto extends ResponseDto {
  public data: FetchConnectionsDto[];
}

export class FetchPageFollowresponseDto extends ResponseDto {
  public data: FetchPageFollowDto[];
}
