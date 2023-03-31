import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomExceptions extends HttpException {
  constructor() {
    super('未知的錯誤', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
