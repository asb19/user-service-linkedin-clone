import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/AuthGuard';
import { CreateOrganisationDto } from 'src/organization/dto/createOrganisationDto.dto';
import { ConnectionService } from './connection.service';
import { ActionQueryDto } from './dtos/actionQuery.dto';
import {
  ConnectionCreateResponseDto,
  FollowPageCreateResponseDto,
} from './dtos/connectionCraete.dto';
import {
  FetchConnectionresponseDto,
  FetchPageFollowresponseDto,
} from './dtos/fetchConnections.dto';

@ApiTags('Connection')
@Controller('connection')
@ApiBearerAuth('XYZ')
export class ConnectionController {
  public constructor(private readonly connectionService: ConnectionService) {}

  @UseGuards(AuthGuard)
  @Post('/sendRequest/:id')
  private async sendConnectionReq(
    @Param('id') id: string,
    @Req() req,
  ): Promise<ConnectionCreateResponseDto> {
    const connection = await this.connectionService.createConnectionRequest(
      req.user.id,
      id,
    );
    return {
      status: true,
      message: 'connection requested successfully',
      data: connection,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/followOrganisation/:id')
  private async followReq(
    @Param('id') id: string,
    @Req() req,
  ): Promise<FollowPageCreateResponseDto> {
    const connection = await this.connectionService.followPage(
      req.user.id,
      parseInt(id),
    );
    return {
      status: true,
      message: 'page followed successfully',
      data: connection,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/takeAction/:id')
  private async handleConnection(
    @Param('id') id: string,
    @Req() req,
    @Query() query: ActionQueryDto,
  ): Promise<ConnectionCreateResponseDto> {
    const connection = await this.connectionService.acceptOrDeleteConnection(
      req.user.id,
      id,
      query.action,
    );
    return {
      status: true,
      message: 'connection updated successfully',
      data: connection,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/fetchConnections')
  private async fetchConnections(
    @Req() req,
  ): Promise<FetchConnectionresponseDto> {
    const connections = await this.connectionService.getConnections(
      req.user.id,
    );
    return {
      status: true,
      message: 'connection fetched successfully',
      data: connections,
    };
  }

  @UseGuards(AuthGuard)
  @Post('/fetchFollowedPages')
  private async fetchFollowPages(
    @Req() req,
  ): Promise<FetchPageFollowresponseDto> {
    const connections = await this.connectionService.getFollowedPages(
      req.user.id,
    );
    return {
      status: true,
      message: 'connection fetched successfully',
      data: connections,
    };
  }
}
