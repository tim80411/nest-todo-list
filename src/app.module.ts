import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './features/todo/todo.module';
import { CopyTodoModule } from './features/copy-todo/copy-todo.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { HelloWorldMiddleware } from './middlewares/hello-world/hello-world.middleware';
import { CopyTodoController } from './features/copy-todo/copy-todo.controller';
import { AddUserMiddleware } from './middlewares/add-user/add-user.middleware';

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
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddUserMiddleware).forRoutes('');

    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: '/todos', method: RequestMethod.GET }) // specific path
      .forRoutes('/todos'); // path match pattern

    consumer.apply(HelloWorldMiddleware).forRoutes(CopyTodoController);
  }
}
