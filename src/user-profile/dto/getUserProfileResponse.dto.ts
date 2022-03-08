import { UserProfile } from '.prisma/client';
import { ResponseDto } from 'src/common/dto/response.dto';

export class GetUserProfile extends ResponseDto {
  public data: UserProfile;
}

export class GetUserProfileWithOtherDetailsDto extends ResponseDto {
  public data: UserProfile & {
    organisationId: number;
    Organisation: {
      fullName: string;
      id: number;
      logo: string;
    };
  };
}
