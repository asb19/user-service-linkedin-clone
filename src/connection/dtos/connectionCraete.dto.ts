import { ResponseDto } from 'src/common/dto/response.dto';

export class ConnectionCreateDto {
  public id?: string;
  public userId: string;
  public connectionId: string;
  public status: string;
  public craetedAt?: Date;
  public updatedAt?: Date;
}

export class FollowOrganisationDto {
  public id?: string;
  public userId: string;
  public orgId: number;
  public craetedAt?: Date;
  public updatedAt?: Date;
}

export class ConnectionCreateResponseDto extends ResponseDto {
  public data: ConnectionCreateDto;
}

export class FollowPageCreateResponseDto extends ResponseDto {
  public data: FollowOrganisationDto;
}
