export abstract class TemplateEngineService {
  abstract compile(
    filename: string,
    variables?: { [key: string]: string | number | object },
  ): Promise<string>;
}
