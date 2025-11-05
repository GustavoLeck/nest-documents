import { ApiTags } from '@nestjs/swagger';
import { EmployeService } from './employe.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { UnlinkDocumentByType } from './dto/unlink-document-by-type.dto';

@Controller('employe')
@ApiTags('Employe')
export class EmployeController {
  constructor(private readonly employeService: EmployeService) {}

  @Get('all')
  async findAll() {
    return await this.employeService.findAll();
  }

  @Post('create')
  async create(@Body() dto: CreateEmployeDto) {
    return await this.employeService.create(dto);
  }

  @Put('update')
  async update(@Body() dto: UpdateEmployeDto) {
    return await this.employeService.update(dto);
  }

  @Put('unlink-document-by-type')
  async unlinkDocumentByType(@Body() dto: UnlinkDocumentByType) {
    return await this.employeService.unlinkDocumentByType(dto);
  }
}
