import { CreateTodoDto } from './create-todo.dto';

describe('CreateTodoDto', () => {
  it('should be defined', () => {
    expect(new CreateTodoDto()).toBeDefined();
  });
});
