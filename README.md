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