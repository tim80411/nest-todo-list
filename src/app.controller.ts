import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigurationService } from './common/configuration/configuration.service';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Controller()
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(
    private readonly configService: ConfigurationService,
    private readonly appService: AppService,
    @Inject('MessageFactory') private readonly name: string,
    @Inject('Value') private readonly value: { name: string },
    @Inject('Alias') private readonly alias: AppService,
    @Inject('Laptop') private readonly computer,
  ) {}

  @Get()
  getHello(@Query() query: { isThrowError: string }): string {
    if (query.isThrowError === 'true')
      throw new HttpException('isThrowError出錯了', HttpStatus.BAD_REQUEST);

    console.log(this.name);
    console.log(this.appService === this.alias);
    console.log(this.computer);
    return (
      this.appService.getHello() +
      this.name +
      this.value.name +
      this.configService.get('USERNAME')
    );
  }
}
