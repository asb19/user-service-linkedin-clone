import { Prisma, User } from '.prisma/client';
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
    console.log(user);
    return user;
  }

  @Post('/create')
  public async CreateUser(@Body() body: { email: string }): Promise<User> {
    const user = await this.userService.createUser(body.email);
    console.log(user);
    return user;
  }

  @Put('/register/:id')
  public async UpdateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, body);
    console.log(user);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/greet')
  public async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}
