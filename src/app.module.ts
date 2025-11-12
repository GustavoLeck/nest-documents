import { Module } from '@nestjs/common';
import { EmployeModule } from './employe/employe.module';
import { DocumentModule } from './document/documente.module';
import { DocumentTypeModule } from './document-type/documente-type.module';

@Module({
  imports: [EmployeModule, DocumentTypeModule, DocumentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
