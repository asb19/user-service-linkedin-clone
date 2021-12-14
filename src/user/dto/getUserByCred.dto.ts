import { ApiProperty } from '@nestjs/swagger';

export class UserByUserNameDto {
  @ApiProperty()
  public username!: string;
}
