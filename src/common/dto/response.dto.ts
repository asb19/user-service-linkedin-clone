import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  public status: boolean;
  public message: string;
}
