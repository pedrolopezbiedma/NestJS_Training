import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(power: number): void {
    return console.log('The powerService is supplying: ', power);
  }
}
