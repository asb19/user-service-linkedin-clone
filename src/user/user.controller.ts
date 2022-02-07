import { Prisma, User } from '.prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateUserDto } from './dto/createUserDto.dto';
import { UserByUserNameDto } from './dto/getUserByCred.dto';
import { GetUser } from './dto/getUserResponse.dto';
import { ResetPasswordDto } from './dto/resetPasswordDto.dto';
import { RegisterQueryDto, UpdateUserDto } from './dto/updateUserDto.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/byId')
  public async GetUser(@Query() query: UserByUserNameDto): Promise<User> {
    const user = await this.userService.findUser(query.username);
    return user;
  }

  @Post('/create')
  public async CreateUser(@Body() body: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(body.email, body.Password);
    console.log(user);
    return user;
  }

  @Put('/register/:id')
  public async UpdateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
    @Query() query: RegisterQueryDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, body, query.otp);
    return user;
  }

  @Put('/resetPassword')
  public async ResetPassword(@Body() body: ResetPasswordDto): Promise<GetUser> {
    const user = await this.userService.resetPassword(
      body.username,
      body.Password,
      body.otp,
    );
    return {
      status: true,
      message: 'password updated successfully',
      data: user,
    };
  }

  @ApiBearerAuth('XYZ')
  @UseGuards(AuthGuard)
  @Get('/greet')
  public async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }

  @Delete('/delete')
  @ApiQuery({ name: 'email', type: String })
  public async delete(@Query('email') email: string): Promise<string> {
    await this.userService.deleteUser(email);
    return `deleted user with email- ${email}`;
  }
}
