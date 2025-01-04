import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';
import { compile } from 'handlebars';

import { TemplateEngineService } from '../template-engine-service.interface';

@Injectable()
export class TemplateEngineServiceImpl implements TemplateEngineService {
  async compile(
    filename: string,
    variables?: { [key: string]: string | object },
  ): Promise<string> {
    const workdir = process.cwd();

    const html = (
      await readFile(join(workdir, 'templates', filename))
    ).toString();

    const template = compile(html);

    return template(variables);
  }
}
