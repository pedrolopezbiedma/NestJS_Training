import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Moved the Global validation & middleware to the app.module for the e2e to wo
  await app.listen(3000);
}
bootstrap();
