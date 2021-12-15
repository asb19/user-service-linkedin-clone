import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({})
  @IsNotEmpty()
  @IsEmail()
  public username: string;

  @IsNotEmpty()
  public Password: string;

  @IsNotEmpty()
  public otp: string;
}
