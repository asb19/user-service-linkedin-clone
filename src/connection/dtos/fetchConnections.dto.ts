import { ResponseDto } from 'src/common/dto/response.dto';

export class FetchConnectionsDto {
  public connectionId: string;
  public photoUrl: string;
  public name: string;
}

export class FetchConnectionresponseDto extends ResponseDto {
  public data: FetchConnectionsDto[];
}
