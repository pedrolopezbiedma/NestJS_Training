import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    private cpuService: CpuService,
    private diskService: DiskService,
  ) {}

  @Get()
  getMessages() {
    const sum = this.cpuService.compute(5, 10);
    const data = this.diskService.getData();
    console.log('Sum is: ', sum, ' and data is: ', data);
    return [sum, data];
  }
}
