import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class RemoveAdminDto {
  @ApiProperty()
  public removed: boolean;
}

export class RemoveAdminResponseDto extends ResponseDto {
  public data: RemoveAdminDto;
}
