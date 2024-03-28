import { CreateTodoDto } from './../dto/create-todo.dto';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dto/update-todo.dto';
import { Todo } from 'src/types/todo';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  async findAll() {
    try {
      return await this.todoRepository.find({
        order: {
          createdAt: 'ASC',
        },
      });
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

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

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.preload({
      id: id,
      ...updateTodoDto,
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }

    return this.todoRepository.save(todo);
  }

  async delete(id: string) {
    try {
      await this.todoRepository.delete(id);
    } catch (error: any) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
