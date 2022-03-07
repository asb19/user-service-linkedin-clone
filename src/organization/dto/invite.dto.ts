import { OrganisationInvites } from '@prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';

export class InviteToOrganisationDto extends ResponseDto {
  public data: OrganisationInvites;
}
