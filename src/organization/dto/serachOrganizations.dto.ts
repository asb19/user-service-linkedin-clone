import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ResponseDto } from 'src/common/dto/response.dto';

export class SearchOrganizationsDto {
  @ApiProperty()
  public id: number;

  public fullName: string;
  public logo: string;
  public location: string;
}

export class SearchOrganizationsResponseDto extends ResponseDto {
  @ApiProperty()
  public data: SearchOrganizationsDto[];
}
