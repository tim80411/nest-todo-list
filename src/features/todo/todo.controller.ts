import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

// 若全域Filter要在特定位置不使用，使用BaseExceptionFilter可以置換
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getTodos();
  }

  @Get('/error')
  getError() {
    throw new NotFoundException('找無');
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return id + typeof id;
  }

  @Post()
  createOne(@Body() dto: CreateTodoDto) {
    return {
      id: 1,
      ...dto,
    };
  }

  @Patch('/:id')
  updateOne(@Param('id') id: number, @Body() dto: UpdateTodoDto) {
    return {
      id,
      ...dto,
    };
  }
}
