import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpExceptionBody,
  HttpStatus,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { FastifyReply } from 'fastify';

@Catch(AxiosError)
export class AxiosExceptionFilter implements ExceptionFilter {
  catch(exception: AxiosError<HttpException>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    const status =
      exception.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;

    const payload: HttpExceptionBody = {
      statusCode: status,
      message:
        exception.response?.data.message || 'An unexpected error occurred',
      error: exception.response?.statusText || 'Error',
    };

    response.status(status).send(payload);
  }
}
