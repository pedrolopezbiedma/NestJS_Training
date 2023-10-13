import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  approved: boolean;

  @Expose()
  brand: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  latitude: number;

  @Expose()
  longitude: number;

  @Expose()
  mileage: number;

  @Expose()
  price: number;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userid: number;
}
