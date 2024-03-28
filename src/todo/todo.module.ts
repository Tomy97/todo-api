import { Module } from '@nestjs/common';
import { TodoController } from './controllers/controllers.controller';
import { TodoService } from './services/services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
  imports: [
    TypeOrmModule.forFeature([ TodoEntity ])
  ]
})
export class TodoModule {}
