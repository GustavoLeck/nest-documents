import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateEmployeDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indica se o funcionário está ativo',
    example: true,
  })
  @IsBoolean()
  active: boolean;
}
