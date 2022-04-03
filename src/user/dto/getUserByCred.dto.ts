import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UserByUserNameDto {
  @ApiProperty()
  public username!: string;
}

export class InviteActionDto {
  @ApiProperty()
  public orgid: string;
  @Type(() => Number)
  public inviteId: number;
  @Type(() => Number)
  public action: number;
}
