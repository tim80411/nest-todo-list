import { Controller, Get, NotFoundException, UseFilters } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TodoService } from './todo.service';

// 若全域Filter要在特定位置不使用，使用BaseExceptionFilter可以置換
@Controller('todos')
@UseFilters(BaseExceptionFilter)
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
}
