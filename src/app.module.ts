import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';

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
  ],
})
export class AppModule {}
