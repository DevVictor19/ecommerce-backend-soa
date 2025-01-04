import { Module } from '@nestjs/common';

import { TemplateEngineServiceImpl } from './services/implementations/template-engine.service';
import { TemplateEngineService } from './services/template-engine-service.interface';

@Module({
  providers: [
    { provide: TemplateEngineService, useClass: TemplateEngineServiceImpl },
  ],
  exports: [TemplateEngineService],
})
export class TemplateEngineModule {}
