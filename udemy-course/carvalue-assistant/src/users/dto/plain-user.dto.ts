import { Expose } from 'class-transformer';

export class PlainUserDto {
  @Expose()
  id: string;

  @Expose()
  email: string;
}
