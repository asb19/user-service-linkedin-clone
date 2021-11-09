import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterQueryDto {
  @IsString()
  @IsNotEmpty()
  public otp: string;
}
