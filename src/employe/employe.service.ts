import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { UnlinkDocumentByType } from './dto/unlink-document-by-type.dto';
import { isNil } from 'lodash';

@Injectable()
export class EmployeService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.employe.findMany({
        include: {
          documents: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async create(dto: CreateEmployeDto) {
    try {
      return await this.prisma.employe.create({
        data: {
          ...dto,
          update_at: new Date(),
          create_at: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async update(dto: UpdateEmployeDto) {
    try {
      return await this.prisma.employe.update({
        where: { id: dto.id },
        data: {
          ...dto,
          update_at: new Date(),
        },
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  async unlinkDocumentByType(dto: UnlinkDocumentByType) {
    try {
      const documents = await this.prisma.documents.findMany({
        where: {
          employe_id: dto.employe_id,
          AND: [
            {
              documents_types: {
                id: { in: dto.document_type_id },
              },
            },
          ],
        },
      });
      for (const doc of documents) {
        await this.prisma.documents.update({
          where: { id: doc.id },
          data: { employe_id: null },
        });
      }
      return 'Documents unlinked successfully';
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
