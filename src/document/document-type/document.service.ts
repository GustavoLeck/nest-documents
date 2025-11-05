import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from './dto/create-document-type.dto';
import { isNil } from 'lodash';

@Injectable()
export class DocumentService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentDto) {
    try {
      return await this.prisma.documents.create({
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

  async findAllPending(params: { employe_id?: string }) {
    try {
      const whereClause = {
        status: 'PENDING',
      };

      if (!isNil(params.employe_id)) {
        whereClause['employe_id'] = params.employe_id;
      }

      return await this.prisma.documents.findMany({
        where: whereClause,
      });
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
