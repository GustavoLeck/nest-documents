import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateDocumentDto {
  @ApiProperty({
    description: 'Nome do funcionário',
    example: 'João Silva',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'ID do funcionário',
    example: 'f79b035b-739b-40fb-9299-987c4f0d988d',
  })
  @IsString()
  employe_id: string;

  @ApiProperty({
    description: 'Tipo do documento',
    example: 'Contrato de Trabalho',
  })
  @IsString()
  document_type: string;

  @ApiProperty({
    description: 'Status do documento',
    example: 'APPROVED | PENDING | REJECTED',
  })
  @IsString()
  status: DocumentStatus;
}
