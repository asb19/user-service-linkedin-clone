import { USER_TYPE } from '.prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  public firstName!: string;

  @IsString()
  public lastName!: string;

  @IsString()
  @IsEmail()
  public altEmail!: string;

  @IsString()
  public altContactNo: string;

  @IsString()
  public userType: USER_TYPE;

  @IsString({ message: 'please input primary contact no' })
  @IsNotEmpty()
  public contactNo: string;
}
