import { User } from '.prisma/client';
import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/AuthGuard';
import { UserByUserNameDto } from './dto/getUserByCred.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @Get('/byId')
  public async GetUser(@Query() query: UserByUserNameDto): Promise<User> {
    const user = await this.userService.findUser(query.username);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('greet')
  public async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}
