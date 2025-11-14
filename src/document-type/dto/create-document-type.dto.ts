import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateDocumentTypeDto {
  @ApiProperty({
    description: 'Nome do tipo de documento',
    example: 'Contrato de Trabalho',
  })
  @IsString()
  name: string;
}
