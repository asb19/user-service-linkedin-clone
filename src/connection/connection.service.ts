import { BadRequestException, Injectable } from '@nestjs/common';
import { CONNECTION_STATUS } from 'src/common/interfaces/connectionStatus';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  ConnectionCreateDto,
  FollowOrganisationDto,
} from './dtos/connectionCraete.dto';
import {
  FetchConnectionsDto,
  FetchPageFollowDto,
  FetchPeopleOrganisationDto,
} from './dtos/fetchConnections.dto';

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

  public async followPage(
    userId: string,
    orgId: number,
  ): Promise<FollowOrganisationDto> {
    try {
      const checkEntry = await this.prismaService.pageFollowMapping.findFirst({
        where: {
          userId,
          orgId,
        },
      });

      if (checkEntry) throw new BadRequestException(`already following`);
      return await this.prismaService.pageFollowMapping.create({
        data: {
          userId,
          orgId,
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

      if (!checkEntry) throw new BadRequestException(`no connection found`);
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

  public async getConnections(
    userId: string,
    status: string,
  ): Promise<FetchConnectionsDto[]> {
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
          status,
        },
      });
      console.log(connections);

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

  public async getFollowedPages(userId: string): Promise<FetchPageFollowDto[]> {
    try {
      const connections = await this.prismaService.pageFollowMapping.findMany({
        where: {
          userId,
        },
      });
      console.log(connections);

      const result: FetchPageFollowDto[] = [];
      for (const entry of connections) {
        const profile = await this.prismaService.organisation.findUnique({
          where: {
            id: entry.orgId,
          },
          select: {
            fullName: true,
            logo: true,
          },
        });
        result.push({
          orgId: entry.orgId,
          name: profile.fullName,
          logo: profile.logo,
        });
      }
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async getOrganisationPeople(
    orgId: number,
    userId: string,
  ): Promise<FetchPeopleOrganisationDto[]> {
    try {
      const experiences = await this.prismaService.userExperience.findMany({
        where: {
          organisationId: orgId,
          statusCode: 1,
        },
        distinct: 'professionalId',
        select: {
          UserProfessionalDetail: {
            select: {
              userId: true,
            },
          },
          designation: true,
          isCurrent: true,
        },
      });

      const result: FetchPeopleOrganisationDto[] = [];
      for (const entry of experiences) {
        const profile = await this.prismaService.user.findUnique({
          where: {
            id: entry.UserProfessionalDetail.userId,
          },
          select: {
            firstName: true,
            lastName: true,
            UserProfile: {
              select: {
                photoUrl: true,
              },
            },
            ConnectionMappingForUser: {
              where: {
                connectionId: userId,
              },
              select: {
                status: true,
              },
              take: 1,
            },
            ConnectionMappingForConnection: {
              where: {
                userId,
              },
              select: {
                status: true,
              },
              take: 1,
            },
          },
        });
        result.push({
          connectionId: entry.UserProfessionalDetail.userId,
          designation: entry.designation,
          isCurrent: entry.isCurrent,
          connectionStatus:
            profile.ConnectionMappingForConnection.length == 0 &&
            profile.ConnectionMappingForUser.length == 0
              ? 'new'
              : profile.ConnectionMappingForConnection.length > 0
              ? profile.ConnectionMappingForConnection[0].status
              : profile.ConnectionMappingForUser[0].status,

          name: profile.firstName + ' ' + profile.lastName,
          photoUrl: profile.UserProfile.photoUrl,
        });
      }
      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public async getOrganisationMutualPeople(
    orgId: number,
    userId: string,
  ): Promise<FetchPeopleOrganisationDto[]> {
    try {
      const experiences = await this.prismaService.userExperience.findMany({
        where: {
          organisationId: orgId,
          statusCode: 1,
        },
        distinct: 'professionalId',
        select: {
          UserProfessionalDetail: {
            select: {
              userId: true,
            },
          },
          designation: true,
          isCurrent: true,
        },
      });

      const result: FetchPeopleOrganisationDto[] = [];
      for (const entry of experiences) {
        const profile = await this.prismaService.user.findUnique({
          where: {
            id: entry.UserProfessionalDetail.userId,
          },
          select: {
            firstName: true,
            lastName: true,
            UserProfile: {
              select: {
                photoUrl: true,
              },
            },
            ConnectionMappingForUser: {
              where: {
                connectionId: userId,

                status: 'accepted',
              },
              select: {
                status: true,
              },
              take: 1,
            },
            ConnectionMappingForConnection: {
              where: {
                userId,

                status: 'accepted',
              },
              select: {
                status: true,
              },
              take: 1,
            },
          },
        });

        if (
          profile.ConnectionMappingForConnection.length == 0 &&
          profile.ConnectionMappingForUser.length == 0
        )
          continue;
        result.push({
          connectionId: entry.UserProfessionalDetail.userId,
          designation: entry.designation,
          isCurrent: entry.isCurrent,
          connectionStatus:
            profile.ConnectionMappingForUser.length > 0
              ? profile.ConnectionMappingForUser[0].status
              : profile.ConnectionMappingForConnection[0].status,

          name: profile.firstName + ' ' + profile.lastName,
          photoUrl: profile.UserProfile.photoUrl,
        });
      }

      return result;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
