import { Type } from 'class-transformer';

export class Paginationdto {
  @Type(() => Number)
  public page?: number = 0;

  @Type(() => Number)
  public limit?: number = 10;
}
