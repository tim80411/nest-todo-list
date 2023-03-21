# nest-todo-list

## Learning note
### Decorator
method decorator like @GET/@POST...etc
param decorator like @Param/@Query
You can rename params by declaring their new name.

For Example:
```ts
@Post()
create(
  @Body('title') newTitle: string,
) {
  return {
    newTitle
  }
}

// it will work if you request
// curl -X POST http://localhost:3000/todos --data '{"title": "yo"}'
// output => '{"newTitle": "yo"}'
```

### Response mode
- (most recommended)Standard: using `return` to let Nest handle the response.
- Package mode: using frameworks' response object to handle the response. note: All methods are void.
```ts
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('todos')
export class TodoController {
  @Get()
  getAll(@Response() res: Response) {
    return [];
    // it won't work;
  }
}
```

Resources will open package mode while using @Res, @Response or @Next in the resource.
We can use `passthrough: boolean` argument to force using standard mode.

