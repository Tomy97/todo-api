import { Controller, Get } from '@nestjs/common';
import { Todo } from 'src/types/todo';
import { TodoService } from '../services/services.service';

@Controller('todo')
export class TodoController {
  private readonly todos: TodoService;
  constructor(todos) {
    this.todos = todos;
  }

  @Get()
  getTodos(): Todo[] {
    return this.todos.getTodos();
  }
}
