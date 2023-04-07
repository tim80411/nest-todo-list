import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodoService } from '../todo/todo.service';

@Controller('copy-todos')
export class CopyTodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getOne() {
    return this.todoService.getTodos();
  }

  @Post('')
  create(@Body() body: { id: number; title: string; description: string }) {
    this.todoService.createTodo(body);
    return body;
  }
}
