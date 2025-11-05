import { IsBoolean, IsString } from 'class-validator';

export class UpdateEmployeDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;
}
