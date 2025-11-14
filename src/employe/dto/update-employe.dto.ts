import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateEmployeDto {
  @ApiProperty({
    description: 'ID do funcionário',
    example: 'f79b035b-739b-40fb-9299-987c4f0d988d',
  })
  @IsString()
  id: string;

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
