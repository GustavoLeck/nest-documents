import { IsString } from 'class-validator';

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  employe_id: string;

  @IsString()
  document_type: string;

  @IsString()
  status: DocumentStatus;
}
