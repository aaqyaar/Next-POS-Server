import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // run
  await app.get(SeedService).run();

  await app.close();
};

void runSeed();
