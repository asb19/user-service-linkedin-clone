import { BadRequestException, Injectable } from '@nestjs/common';
import { CONNECTION_STATUS } from 'src/common/interfaces/connectionStatus';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConnectionCreateDto } from './dtos/connectionCraete.dto';
import { FetchConnectionsDto } from './dtos/fetchConnections.dto';

@Injectable()
export class ConnectionService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createConnectionRequest(
    userId: string,
    connectionId: string,
  ): Promise<ConnectionCreateDto> {
    try {
      const checkEntry = await this.prismaService.connectionMapping.findFirst({
        where: {
          userId,
          connectionId,
        },
      });

      if (checkEntry)
        throw new BadRequestException(`already ${checkEntry.status}`);
      return await this.prismaService.connectionMapping.create({
        data: {
          userId,
          connectionId,
          status: 'requested',
        },
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async acceptOrDeleteConnection(
    userId: string,
    id: string,
    action: number,
  ): Promise<ConnectionCreateDto> {
    try {
      const checkEntry = await this.prismaService.connectionMapping.findUnique({
        where: {
          id,
        },
      });

      if (checkEntry) throw new BadRequestException(`no connection found`);
      return action == 0
        ? await this.prismaService.connectionMapping.delete({
            where: {
              id,
            },
          })
        : await this.prismaService.connectionMapping.update({
            where: {
              id,
            },
            data: {
              status: 'accepted',
            },
          });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async getConnections(userId: string): Promise<FetchConnectionsDto[]> {
    try {
      const connections = await this.prismaService.connectionMapping.findMany({
        where: {
          OR: [
            {
              userId,
            },
            {
              connectionId: userId,
            },
          ],
          status: 'accepted',
        },
      });

      const result: FetchConnectionsDto[] = [];
      for (const entry of connections) {
        const profileId =
          entry.userId == userId ? entry.connectionId : entry.userId;
        const profile = await this.prismaService.user.findUnique({
          where: {
            id: profileId,
          },
          select: {
            firstName: true,
            lastName: true,
            UserProfile: {
              select: {
                photoUrl: true,
              },
            },
          },
        });
        result.push({
          connectionId: profileId,
          name: profile.firstName + ' ' + profile.lastName,
          photoUrl: profile.UserProfile?.photoUrl,
        });
      }
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
