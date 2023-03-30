import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MessageFactory') private readonly name: string,
    @Inject('Value') private readonly value: { name: string },
    @Inject('Alias') private readonly alias: AppService,
    @Inject('Laptop') private readonly computer,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.name);
    console.log(this.appService === this.alias);
    console.log(this.computer);
    return this.appService.getHello() + this.name + this.value.name;
  }
}
