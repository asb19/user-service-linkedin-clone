import { ApiProperty } from '@nestjs/swagger';

export class UserByUserNameDto {
  @ApiProperty()
  public username!: string;
}

export class InviteActionDto extends UserByUserNameDto {
  public orgid: string;
}
