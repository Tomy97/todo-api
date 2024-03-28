import { CreateTodoDto } from './../dto/create-todo.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  // TODO: hacer un get de todos los datos de la base de datos
  async findAll() {
    try {
      return await this.todoRepository.find();
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  // TODO: hacer un post de un nuevo dato a la base de datos

  async create(createTodoDto: CreateTodoDto) {
    try {
      const todo = this.todoRepository.create(createTodoDto);
      await this.todoRepository.save(todo);
      return todo;
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  // TODO: hacer un put de un dato de la base de datos

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.preload({
      id: id,
      ...updateTodoDto,
    });

    if (!todo) throw new InternalServerErrorException('Todo not found');
    try {
      await this.todoRepository.save(updateTodoDto);

      return todo;
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
  // TODO: hacer un delete de un dato de la base de datos

  async delete(id: number) {
    try {
      await this.todoRepository.delete(id);
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
