import { BadRequestException, Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import { CreateDocumentDto } from './dto/create-document.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateDocumentDto) {
    try {
      return await this.prismaService.documents.create({
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

  async findAllPending(params: {
    employe_id?: string;
    cursor?: string;
    limit?: number;
    document_type_id?: string;
  }) {
    try {
      let limit = params.limit || 25;
      if (limit > 250) {
        limit = 250;
      }

      const whereClause = {
        status: 'PENDING',
      };

      if (!isNil(params.employe_id)) {
        whereClause['employe_id'] = params.employe_id;
      }

      if (!isNil(params.document_type_id)) {
        whereClause['document_type_id'] = params.document_type_id;
      }

      const documents = await this.prismaService.documents.findMany({
        where: whereClause,
        take: limit + 1,
        cursor: params?.cursor ? { id: params?.cursor } : undefined,
        orderBy: { id: 'asc' },
      });

      const hasNextPage = documents.length > limit;
      if (hasNextPage) {
        documents.pop();
      }
      return { documents, hasNextPage };
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}
