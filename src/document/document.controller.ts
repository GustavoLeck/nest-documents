import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto } from './dto/create-document.dto';

@Controller('document')
@ApiTags('Document')
export class DocumentController {
  constructor(private readonly documentTypeService: DocumentService) {}

  @Post('create')
  async create(@Body() dto: CreateDocumentDto) {
    return this.documentTypeService.create(dto);
  }

  @ApiQuery({
    name: 'employe_id',
    required: false,
    description: 'ID do funcionário para filtrar documentos pendentes',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get('pending')
  async pending(@Param() params: { employe_id?: string }) {
    return this.documentTypeService.findAllPending(params);
  }
}
