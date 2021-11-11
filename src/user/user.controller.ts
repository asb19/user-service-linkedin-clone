import { User } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UserByUserNameDto } from './dto/getUserByCred.dto';
import { UpdateUserDto } from './dto/updateUserDto.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/byId')
  public async GetUser(@Query() query: UserByUserNameDto): Promise<User> {
    const user = await this.userService.findUser(query.username);
    return user;
  }

  @Post('/create')
  public async CreateUser(
    @Body() body: { email: string; Password: string },
  ): Promise<User> {
    const user = await this.userService.createUser(body.email, body.Password);
    console.log(user);
    return user;
  }

  @Put('/register/:id')
  public async UpdateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
    @Query() query: { otp: string },
  ): Promise<User> {
    const user = await this.userService.updateUser(id, body, query.otp);
    return user;
  }

  @Put('/resetPassword')
  public async ResetPassword(
    @Body() body: { username: string; Password: string; otp: string },
  ): Promise<User> {
    const user = await this.userService.resetPassword(
      body.username,
      body.Password,
      body.otp,
    );
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/greet')
  public async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}
