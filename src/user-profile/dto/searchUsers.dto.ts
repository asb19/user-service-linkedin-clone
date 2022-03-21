import { ResponseDto } from 'src/common/dto/response.dto';

export class SearchUsersByNameDto {
  public id: string;
  public firstName: string;
  public lastName: string;
  public photoUrl?: string;
  public designation?: string;
  public gender?: string;
}

export class SearchResponseDto extends ResponseDto {
  public data: SearchUsersByNameDto[];
}
