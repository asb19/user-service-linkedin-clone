import { ResponseDto } from 'src/common/dto/response.dto';

export class ConnectionCreateDto {
  public id?: string;
  public userId: string;
  public connectionId: string;
  public status: string;
  public craetedAt?: Date;
  public updatedAt?: Date;
}

export class ConnectionCreateResponseDto extends ResponseDto {
  public data: ConnectionCreateDto;
}
