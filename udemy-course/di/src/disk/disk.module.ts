import { Module } from '@nestjs/common';
import { PowerModule } from 'src/power/power.module';

@Module({
  imports: [PowerModule],
})
export class DiskModule {}
