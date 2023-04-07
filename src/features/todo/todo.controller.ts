import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/decoractors/roles/roles.decorator';
import { Auth } from 'src/decorators/auth/auth.decorator';
import { User } from 'src/decorators/user/user.decorator';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { HelloWorldInterceptor } from 'src/interceptors/hello-world/hello-world.interceptor';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

// 若全域Filter要在特定位置不使用，使用BaseExceptionFilter可以置換
@Controller('todos')
@UseInterceptors(HelloWorldInterceptor)
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

  @Get('/auth')
  // same as @UseGuard + @Roles
  @Auth('admin')
  getAuth() {
    return 'ok';
  }

  @Get('/:id')
  @UseGuards(RoleGuard)
  @Roles('staff')
  getOne(@Param('id') id: number, @User('title') userName: string) {
    console.log('==todo getOne==', userName);
    return id + typeof id + userName;
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
