import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeModule } from './employe/employe.module';
import { DocumentTypeModule } from './document-type/documente-type.module';
import { DocumentModule } from './document/document-type/documente.module';

@Module({
  imports: [EmployeModule, DocumentTypeModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
