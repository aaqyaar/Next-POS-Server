import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeedService } from './seed.service';
import { PasswordService } from 'src/auth/password.service';

@Module({
  imports: [
    PrismaModule,

    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env'],
    }),
  ],
  providers: [SeedService, PasswordService],
})
export class SeedModule {}
