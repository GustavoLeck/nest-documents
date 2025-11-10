import { Module } from '@nestjs/common';
import { EmployeModule } from './employe/employe.module';
import { DocumentTypeModule } from './document-type/documente-type.module';
import { DocumentModule } from './document/document-type/documente.module';

@Module({
  imports: [EmployeModule, DocumentTypeModule, DocumentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
