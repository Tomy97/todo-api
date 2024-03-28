import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from '../services/services.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  @Get()
  async getTodos() {
    return await this.todosService.findAll();
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return await this.todosService.update(id, updateTodoDto);
  }
  @Delete(':id')
  async deleteTodo(@Param('id', ParseUUIDPipe) id: string) {
    return await this.todosService.delete(id);
  }
}
