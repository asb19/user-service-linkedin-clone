import { User } from '.prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';

export class GetUser extends ResponseDto {
  public data: User;
}
