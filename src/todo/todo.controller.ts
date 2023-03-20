import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('todos')
export class TodoController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): any {
    return [];
  }

  @Get('/examples')
  getExample(): object[] {
    return [
      {
        id: 1,
        title: 'Example 12',
        description: '',
      },
    ];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(
    @Param('id') id: string,
    @Query() query: { skip: number; limit: number },
  ) {
    // const { id } = params;
    const { skip, limit } = query;
    return {
      id,
      title: `Title ${id}`,
      description: '',
      skip,
      limit,
    };
  }

  @Post()
  createOne(@Body() body: { title: string; completed?: boolean }) {
    const { title, completed } = body;
    return {
      title,
      completed,
    };
  }
}
