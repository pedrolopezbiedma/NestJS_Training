import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(num1: number, num2: number): number {
    const sum = num1 + num2;
    this.powerService.supplyPower(sum);
    return sum;
  }
}
