import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class OrganisationAdminListDto {
  @ApiProperty()
  public userId: string;
  public firstName?: string;
  public lastName?: string;
  public photoUrl?: string;
  public status: number;
  public role: string;
  public id: string;
}

export class AdminListDto {
  @ApiProperty()
  public ownerAccess: boolean;
  public adminList: OrganisationAdminListDto[];
}

export class AdminListResponseDto extends ResponseDto {
  public data: AdminListDto;
}
