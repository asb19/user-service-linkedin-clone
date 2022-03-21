import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  public text: string;

  @Type(() => Number)
  public page: number;

  @Type(() => Number)
  public limit: number;
}
