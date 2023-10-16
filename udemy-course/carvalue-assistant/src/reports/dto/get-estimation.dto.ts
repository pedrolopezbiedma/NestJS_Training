import { Transform } from 'class-transformer';
import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetEstimationDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1900)
  @Max(2500)
  @Transform(({ value }) => parseInt(value))
  year: number;

  @IsLatitude()
  @Transform(({ value }) => parseInt(value))
  latitude: number;

  @IsLongitude()
  @Transform(({ value }) => parseInt(value))
  longitude: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @Transform(({ value }) => parseInt(value))
  mileage: number;
}
