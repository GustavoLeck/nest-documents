import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UnlinkDocumentByType {
  @ApiProperty({
    description: 'ID do funcionário',
    example: 'f79b035b-739b-40fb-9299-987c4f0d988d',
  })
  @IsString()
  employe_id: string;

  @ApiProperty({
    description: 'IDs dos tipos de documentos',
    example: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
  })
  @IsArray()
  document_type_id: string[];
}
