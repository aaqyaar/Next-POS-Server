import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.user.findMany({
      include: {
        role: true,
        company: true,
      },
    });
  }

  async findOne(fields: Prisma.UserWhereInput) {
    const user = await this.prismaService.user.findFirst({
      where: { ...fields },
      include: {
        role: true,
        company: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
