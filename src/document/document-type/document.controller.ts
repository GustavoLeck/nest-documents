import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document-type.dto';

@Controller('document')
@ApiTags('Document')
export class DocumentController {
  constructor(private readonly documentTypeService: DocumentService) {}

  @Post('create')
  async create(@Body() dto: CreateDocumentDto) {
    return this.documentTypeService.create(dto);
  }

  @Get('pending')
  async pending(@Param() params: { employe_id?: string }) {
    return this.documentTypeService.findAllPending(params);
  }
}
