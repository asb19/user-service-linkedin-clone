import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class InviteActionDataDto {
  @ApiProperty()
  public accepted: boolean;
}
export class InviteActionresponseDto extends ResponseDto {
  @ApiProperty()
  public data: InviteActionDataDto;
}
