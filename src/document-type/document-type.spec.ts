import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { DocumentTypeService } from './document-type.service';
import { CreateDocumentTypeDto } from './dto/create-document-type.dto';
import { PrismaService } from '../prisma/prisma.service';

const mockPrismaService = {
  documents_types: {
    findFirst: jest.fn(),
    create: jest.fn(),
  },
};

describe('DocumentTypeService', () => {
  let service: DocumentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentTypeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DocumentTypeService>(DocumentTypeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createDocumentTypeDto: CreateDocumentTypeDto = {
      name: 'Test Document Type',
    };

    const mockDocumentType = {
      id: 1,
      description: 'Test description',
      create_at: new Date('2023-01-01'),
      update_at: new Date('2023-01-01'),
    };

    it('should create a new document type successfully', async () => {
      await service.create(createDocumentTypeDto);

      expect(mockPrismaService.documents_types.create).toHaveBeenCalledWith({
        data: {
          ...createDocumentTypeDto,
          create_at: expect.any(Date),
          update_at: expect.any(Date),
        },
      });
    });

    it('should throw BadRequestException when document type already exists', async () => {
      mockPrismaService.documents_types.findFirst.mockResolvedValue(
        mockDocumentType,
      );

      await expect(service.create(createDocumentTypeDto)).rejects.toThrow(
        BadRequestException,
      );

      expect(mockPrismaService.documents_types.findFirst).toHaveBeenCalledWith({
        where: { name: createDocumentTypeDto.name },
      });

      expect(mockPrismaService.documents_types.create).not.toHaveBeenCalled();
    });
  });
});
