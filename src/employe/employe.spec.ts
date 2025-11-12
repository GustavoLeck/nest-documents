import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EmployeService } from './employe.service';
import { BadRequestException } from '@nestjs/common';

const mockPrismaService = {
  employe: {
    findFirst: jest.fn(),
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
  },
  documents: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
};

const mockController = {
  create: mockPrismaService.employe.create,
  pending: jest.fn(),
};

describe('EmployeService', () => {
  let service: EmployeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EmployeService>(EmployeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const createEmployeMock = { name: 'John Doe', active: true };
    it('should create a new employe successfully', async () => {
      await mockController.create(createEmployeMock);

      expect(mockPrismaService.employe.create).toHaveBeenCalledWith({
        data: {
          ...createEmployeMock,
          create_at: expect.any(Date),
          update_at: expect.any(Date),
        },
      });
      expect(service.create).toBeDefined();
    });
  });

  describe('update', () => {
    const updateEmployeMock = { id: '123', name: 'John Doe', active: true };
    it('should update a employe successfully', async () => {
      await service.update(updateEmployeMock);

      expect(mockPrismaService.employe.update).toHaveBeenCalledWith({
        where: { id: updateEmployeMock.id },
        data: {
          ...updateEmployeMock,
          update_at: expect.any(Date),
        },
      });
      expect(service.update).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should findAll a employe successfully', async () => {
      await service.findAll();

      expect(mockPrismaService.employe.findMany).toHaveBeenCalledWith({
        include: {
          documents: true,
        },
      });
      expect(service.findAll).toBeDefined();
    });
  });

  describe('unlinkDocumentByType', () => {
    const unlinkDocumentByTypeDtoMock = {
      employe_id: '123',
      document_type_id: ['456', '789'],
    };
    it('should unlink a document by type successfully', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue([
        {
          id: '4dca20dd-3a58-4a2c-b512-45013cb5f46f',
          name: 'teste',
          employe_id: '84e160d1-e396-4031-bea7-d7fc7d6d2437',
          document_type: '55c1fc85-bdfe-4049-a6bd-d5378766a502',
          status: 'APPROVED',
          create_at: '2025-11-05T03:47:41.436Z',
          update_at: '2025-11-05T03:47:41.436Z',
        },
        {
          id: '213d3881-1a3f-4c12-927c-24fbfa0bf5d9',
          name: 'teste',
          employe_id: '84e160d1-e396-4031-bea7-d7fc7d6d2437',
          document_type: '55c1fc85-bdfe-4049-a6bd-d5378766a502',
          status: 'APPROVED',
          create_at: '2025-11-05T03:54:59.512Z',
          update_at: '2025-11-05T03:54:59.512Z',
        },
      ]);

      await service.unlinkDocumentByType(unlinkDocumentByTypeDtoMock);

      expect(mockPrismaService.documents.findMany).toHaveBeenCalledWith({
        where: {
          employe_id: unlinkDocumentByTypeDtoMock.employe_id,
          AND: [
            {
              documents_types: {
                id: { in: unlinkDocumentByTypeDtoMock.document_type_id },
              },
            },
          ],
        },
      });

      expect(mockPrismaService.documents.update).toHaveBeenCalledWith({
        where: { id: '4dca20dd-3a58-4a2c-b512-45013cb5f46f' },
        data: { employe_id: null },
      });

      expect(service.unlinkDocumentByType).toBeDefined();
      expect(mockPrismaService.documents.update).toBeDefined();
    });
  });

  describe('create exception', () => {
    it('should create exception', async () => {
      mockPrismaService.employe.create.mockResolvedValue(new Error());

      await service.create({});
      expect(service.create).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll exception', () => {
    it('should create exception', async () => {
      mockPrismaService.employe.findMany.mockResolvedValue(new Error());

      await service.findAll({});
      expect(service.findAll).rejects.toThrow(BadRequestException);
    });
  });

  describe('update exception', () => {
    it('should update exception', async () => {
      const updateEmployeMock = { id: '123', name: 'John Doe', active: true };

      mockPrismaService.employe.update.mockResolvedValue(new Error());

      await service.update(updateEmployeMock);
      expect(service.findAll).rejects.toThrow(BadRequestException);
    });
  });

  describe('unlinkDocumentByType exception', () => {
    const unlinkDocumentByTypeDtoMock = {
      employe_id: '123',
      document_type_id: ['456', '789'],
    };
    it('should unlinkDocumentByType exception', async () => {
      mockPrismaService.documents.findMany.mockResolvedValue([]);
      mockPrismaService.documents.update.mockResolvedValue(new Error());

      await service.unlinkDocumentByType(unlinkDocumentByTypeDtoMock);

      expect(service.unlinkDocumentByType).rejects.toThrow(BadRequestException);
    });
  });
});
