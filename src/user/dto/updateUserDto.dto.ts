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

  @IsString({ message: 'please input primary contact no' })
  @IsNotEmpty()
  public contactNo: string;

  @IsString({ message: 'please input password' })
  @IsNotEmpty()
  public Password: string;
}
