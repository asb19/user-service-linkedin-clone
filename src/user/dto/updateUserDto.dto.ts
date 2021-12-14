import { USER_TYPE } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  public firstName!: string;

  @IsString()
  public lastName!: string;

  @IsString()
  @IsEmail()
  public altEmail!: string;

  @IsString()
  public altContactNo: string;

  @ApiProperty({ enum: USER_TYPE })
  public userType: USER_TYPE;

  @IsString({ message: 'please input primary contact no' })
  @IsNotEmpty()
  public contactNo: string;
}

export class RegisterQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  public otp: string;
}
