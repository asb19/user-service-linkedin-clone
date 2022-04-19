import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ActionQueryDto {
  @ApiProperty()
  @Type(() => Number)
  public action: number;
}
