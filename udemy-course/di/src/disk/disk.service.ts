import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData(): number {
    console.log('Estoy en el getData');
    this.powerService.supplyPower(20);
    return 30;
  }
}
