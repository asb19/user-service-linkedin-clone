import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class UserInvititaionOrgDto {
  @ApiProperty()
  public id: number;
  public orgId: number;
  public orgName?: string;
  public userId: string;
  public orgLogo?: string;
  public status: string;
  public location?: string;
  public createdAt: Date;
  public text?: string;
}

export class UserInviteOrgResponseDto extends ResponseDto {
  public data: UserInvititaionOrgDto;
}
