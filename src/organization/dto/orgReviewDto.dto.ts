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
  public userType?: string;
  public userDesignation?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

export class OrganisationReviewResponseDto extends ResponseDto {
  public data: OrganisationReviewDto;
}

export class OrganisationDeleteReviewResponseDto extends ResponseDto {
  public data: string;
}

export class ReviewListStructuredto extends OrganisationReviewDto {
  @ApiProperty()
  public editAccess: boolean;
}

export class OrganisationReviewListDto {
  @ApiProperty()
  public reviewList: ReviewListStructuredto[];
  public rating: {
    rating: number;
  };
  public totalReviews: number;
}

export class ReviewListDto extends ResponseDto {
  public data: OrganisationReviewListDto;
}
