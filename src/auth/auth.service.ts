import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordService } from './password.service';
import { AuthSignInDto, AuthSignUpDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly prismaService: PrismaService,
  ) {}

  async signIn(body: AuthSignInDto) {
    const { username, password } = body;

    const user = await this.usersService.findOne({
      OR: [
        {
          phone: username,
        },
        {
          email: username,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const valid = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (!valid) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
    };
    const tokens = this.getTokens(payload);

    return {
      user,
      tokens,
    };
  }

  async signUp(body: AuthSignUpDto) {
    const userFound = await this.prismaService.user.findFirst({
      where: {
        OR: [
          {
            phone: body.phone,
          },
          {
            email: body.email,
          },
        ],
      },
    });

    if (userFound) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      body.password,
    );

    const data: AuthSignUpDto = {
      ...body,
      password: hashedPassword,
    };
    const user = await this.prismaService.user.create({
      data,
    });

    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
    };

    const tokens = this.getTokens(payload);

    return {
      ...tokens,
    };
  }

  getTokens(payload: any): { accessToken: string; refreshToken: string } {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '7d',
      }),
    };
  }
}
