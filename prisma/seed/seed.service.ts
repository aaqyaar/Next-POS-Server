import { Injectable } from '@nestjs/common';
import { PasswordService } from 'src/auth/password.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async runPermissions() {
    const permissions = await this.prismaService.permission.findMany();

    if (permissions.length > 0) {
      return;
    }

    return await this.prismaService.permission.createMany({
      data: [
        {
          action: 'CREATE',
          subject: 'User',
        },
        {
          action: 'READ',
          subject: 'User',
        },
        {
          action: 'UPDATE',
          subject: 'User',
        },
        {
          action: 'DELETE',
          subject: 'User',
        },
        {
          action: 'CREATE',
          subject: 'Role',
        },
        {
          action: 'READ',
          subject: 'Role',
        },
        {
          action: 'UPDATE',
          subject: 'Role',
        },
        {
          action: 'DELETE',
          subject: 'Role',
        },
        {
          action: 'READ',
          subject: 'Product',
        },
      ],
    });
  }

  async runRoles() {
    const roles = await this.prismaService.role.findMany();

    if (roles.length > 0) {
      return;
    }

    const permissions = await this.prismaService.permission.findMany();

    // get permissions their id with in array
    const permissionIds = permissions.map((permission) => permission.id);

    // get the cashier permission
    const cashierPermission = await this.prismaService.permission.findMany({
      where: {
        subject: 'Product',
      },
    });

    // create cashier role
    await this.prismaService.role.create({
      data: {
        name: 'CASHIER',
        permissions: {
          connect: cashierPermission.map((permission) => ({
            id: permission.id,
          })),
        },
      },
    });
    return await this.prismaService.role.create({
      data: {
        name: 'ADMIN',
        permissions: {
          connect: permissionIds.map((id) => ({ id })),
        },
      },
    });
  }

  async runUsers() {
    const users = await this.prismaService.user.findMany();

    if (users.length > 0) {
      return;
    }

    // get admin role
    const adminRole = await this.prismaService.role.findFirst({
      where: {
        name: 'ADMIN',
      },
    });

    // get cashier role
    const cashierRole = await this.prismaService.role.findFirst({
      where: {
        name: 'CASHIER',
      },
    });

    const hashed = (
      await this.passwordService.hashPassword('123456')
    ).toString();

    return await this.prismaService.user.createMany({
      data: [
        {
          email: 'abdizamedmo@gmail.com',
          password: hashed,
          name: 'Abdi Zamed',
          roleId: adminRole.id,
          phone: '252618977249',
        },
        {
          email: 'cashier@gmail.com',
          password: hashed,
          name: 'Cashier',
          roleId: cashierRole.id,
          phone: '252618977240',
        },
      ],
    });
  }

  async run() {
    await this.runPermissions();
    await this.runRoles();
    await this.runUsers();
  }
}
