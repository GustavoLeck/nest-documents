import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DocumentTypeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDocumentTypeDto) {
    try {
      const documentTypeExists = await this.prisma.documents_types.findFirst({
        where: {
          name: dto.name,
        },
      });
      if (documentTypeExists) {
        throw new BadRequestException('Document type already exists');
      }
      return await this.prisma.documents_types.create({
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
}
