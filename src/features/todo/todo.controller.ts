import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  ParseBoolPipe,
  UseFilters,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ParseIntPipe } from 'src/pipes/parse-int/parse-int.pipe';
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

  @Get('/:id')
  getOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return id;
  }
}
