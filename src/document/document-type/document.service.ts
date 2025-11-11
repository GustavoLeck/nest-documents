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

      if (!isNil(params.cursor)) {
        whereClause['id'] = { gt: params.cursor };
      }

      if (!isNil(params.document_type_id)) {
        whereClause['document_type'] = params.document_type_id;
      }

      const documents = await this.prisma.documents.findMany({
        where: whereClause,
        take: limit + 1,
        cursor: { id: params?.cursor },
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
