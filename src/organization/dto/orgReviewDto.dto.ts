import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dto/response.dto';

export class OrganisationReviewDto {
  @ApiProperty()
  public id?: string;
  public userId: string;
  public orgId: number;
  public rating: number;
  public reviewTitle: string;
  public reviewText?: string;
  public userDetail?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export class OrganisationReviewResponseDto extends ResponseDto {
  public data: OrganisationReviewDto;
}

export class OrganisationReviewListDto {
  @ApiProperty()
  public reviewList: OrganisationReviewDto[];
  public rating: {
    rating: number;
  };
}

export class ReviewListDto extends ResponseDto {
  public data: OrganisationReviewListDto;
}
