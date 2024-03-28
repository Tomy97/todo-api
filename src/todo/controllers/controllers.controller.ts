import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { TodoService } from '../services/services.service';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todosService: TodoService) {}

  // TODO: Get de todos los todos de la base de datos
  @Get()
  async getTodos() {
    return await this.todosService.findAll();
  }
  // TODO: POST de todos los todos de la base de datos

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.create(createTodoDto);
  }
  // TODO: PUT de todos los todos de la base de datos
  @Patch(':id')
  async updateTodo(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() updateTodoDto: UpdateTodoDto
    ) {
    return await this.todosService.update(id, updateTodoDto);
  }
  // TODO: DELETE de todos los todos de la base de datos
  @Delete(':id')
  async deleteTodo(@Param('id', ParseUUIDPipe ) id: string) {
    return await this.todosService.delete(id);
  }
}
