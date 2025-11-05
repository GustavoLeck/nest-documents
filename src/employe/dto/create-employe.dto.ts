import { IsBoolean, IsString } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  name: string;

  @IsBoolean()
  active: boolean;
}
