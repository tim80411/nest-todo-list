import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';

class MessageBox {
  private readonly message: string;
  constructor(message: string) {
    this.message = message;
  }
}

class Mac {
  cpu = 'M1';
}

class HP {
  cpu = 'i7';
}

@Module({
  imports: [TodoModule, CopyTodoModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'Name',
      useValue: 'Tim',
    },
    {
      provide: 'MessageFactory',
      useFactory(appService: AppService) {
        return new MessageBox(appService.getHello());
      },
      inject: [AppService],
    },
    {
      provide: 'Value',
      useValue: {
        name: 'handsome',
      },
    },
    {
      provide: 'Alias',
      useExisting: AppService,
    },
    {
      provide: 'Laptop',
      useClass: false ? Mac : HP,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}
