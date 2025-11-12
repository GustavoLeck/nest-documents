import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentService } from './document.service';
import { CreateDocumentDto, DocumentStatus } from './dto/create-document.dto';
import { BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  documents: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

const mockController = {
  create: jest.fn(),
  pending: jest.fn(),
};

const createDocumentMock: CreateDocumentDto = {
  name: 'Test Document',
  employe_id: 'Test Document',
  document_type: 'Test Document',
  status: DocumentStatus.PENDING,
};

describe('DocumentService', () => {
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new document successfully', async () => {
      await service.create(createDocumentMock);

      expect(mockPrismaService.documents.create).toHaveBeenCalledWith({
        data: {
          ...createDocumentMock,
          create_at: expect.any(Date),
          update_at: expect.any(Date),
        },
      });
    });
  });

  describe('findAllPending by employeId', () => {
    const mockParamsEmployeId = {
      employe_id: '123',
    };
    const mockQueryEmployeId = {
      take: 26,
      cursor: undefined,
      orderBy: { id: 'asc' },
      where: {
        employe_id: '123',
        status: 'PENDING',
      },
    };

    it('should findAllPending document exists by employeId', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue([
        createDocumentMock,
      ]);

      await service.findAllPending(mockParamsEmployeId);

      expect(mockPrismaService.documents.findMany).toHaveBeenCalledWith(
        mockQueryEmployeId,
      );
    });
  });

  describe('findAllPending by document_type', () => {
    const mockParamsDocumentType = {
      document_type_id: '123',
    };
    const mockQueryDocumentType = {
      take: 26,
      cursor: undefined,
      orderBy: { id: 'asc' },
      where: {
        document_type_id: '123',
        status: 'PENDING',
      },
    };

    it('should findAllPending document exists by document_type', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue([
        createDocumentMock,
      ]);

      await service.findAllPending(mockParamsDocumentType);

      expect(mockPrismaService.documents.findMany).toHaveBeenCalledWith(
        mockQueryDocumentType,
      );
    });
  });

  describe('findAllPending by cursor', () => {
    const mockParamsDocumentType = {
      cursor: '123',
    };
    const mockQueryDocumentType = {
      take: 26,
      cursor: { id: '123' },
      orderBy: { id: 'asc' },
      where: {
        status: 'PENDING',
      },
    };

    it('should findAllPending document exists by cursor', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue([
        createDocumentMock,
      ]);

      await service.findAllPending(mockParamsDocumentType);

      expect(mockPrismaService.documents.findMany).toHaveBeenCalledWith(
        mockQueryDocumentType,
      );
    });
  });

  describe('findAllPending limit > 250', () => {
    const mockParamsDocumentType = {
      limit: 251,
    };
    const mockQueryDocumentType = {
      take: 251,
      cursor: undefined,
      orderBy: { id: 'asc' },
      where: {
        status: 'PENDING',
      },
    };

    it('limit > 250', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue([
        createDocumentMock,
      ]);

      await service.findAllPending(mockParamsDocumentType);

      expect(mockPrismaService.documents.findMany).toHaveBeenCalledWith(
        mockQueryDocumentType,
      );
    });
  });

  describe('findAllPending have more than limit', () => {
    const mockQueryDocumentType = {
      take: 26,
      cursor: undefined,
      orderBy: { id: 'asc' },
      where: {
        status: 'PENDING',
      },
    };
    const listMock = [mockQueryDocumentType];
    for (let index = 0; index < 27; index++) {
      listMock.push(mockQueryDocumentType);
    }

    it('should findAllPending document exist hasNextPage', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue(listMock);
      await service.findAllPending({});

      expect(mockPrismaService.documents.findMany).toHaveBeenCalledWith(
        mockQueryDocumentType,
      );
    });
  });

  describe('findAllPending exception', () => {
    it('should findAllPending exception', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue({});

      await service.findAllPending({});
      expect(service.findAllPending).rejects.toThrow(BadRequestException);
    });
  });

  describe('create exception', () => {
    it('should create exception', async () => {
      mockPrismaService.documents.create.mockResolvedValue({});

      await service.create(createDocumentMock);
      expect(service.create).rejects.toThrow(BadRequestException);
    });
  });

  describe('create controller', () => {
    it('should create exception', async () => {
      mockController.create.mockResolvedValue({});
      mockPrismaService.documents.create.mockResolvedValue({});

      await service.create(createDocumentMock);
      expect(service.create).rejects.toThrow(BadRequestException);
    });
  });
});
