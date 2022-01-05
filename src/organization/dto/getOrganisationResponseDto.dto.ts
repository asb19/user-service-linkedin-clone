import { Organisation } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class GetOrganisation extends ResponseDto {
  @ApiProperty()
  public data: Organisation;
}

export class GetOrganisations extends ResponseDto {
  @ApiProperty()
  public data: Organisation[];
}
