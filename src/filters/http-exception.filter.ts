import {
  ArgumentMetadata,
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  PipeTransform,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const errName = exception.message;
    const message = (exception.getResponse() as any).message;
    const timeStamp = new Date().toISOString();

    const responseObject = {
      code: status,
      title: errName,
      message,
      timeStamp,
    };

    response.status(status).json(responseObject);
  }
}
