import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';

@Controller('documente-type')
@ApiTags('Document Type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post('create')
  async create(@Body() dto: CreateDocumentTypeDto) {
    return this.documentTypeService.create(dto);
  }
}
