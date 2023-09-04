import { NestFactory } from '@nestjs/core';
import { ComputerModule } from './computer/computer.module';

async function bootstrap() {
  // Commented out because there is no App module, more modules to be created in #33 ->
  const app = await NestFactory.create(ComputerModule);
  await app.listen(3000);
}
bootstrap();
