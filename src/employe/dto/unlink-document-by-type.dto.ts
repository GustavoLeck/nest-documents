import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UnlinkDocumentByType {
  @IsString()
  employe_id: string;

  @IsArray()
  document_type_id: string[];
}
