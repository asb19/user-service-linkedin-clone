import { ApiProperty } from '@nestjs/swagger';

export class UserByUserNameDto {
  @ApiProperty()
  public username!: string;
}

export class InviteActionDto {
  @ApiProperty()
  public orgid: string;
  public inviteId: number;
  public action: number;
}
