import { IsString } from 'class-validator';

export class CreateDocumentTypeDto {
  @IsString()
  name: string;
}
