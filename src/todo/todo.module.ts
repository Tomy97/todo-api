import { Module } from '@nestjs/common';
import { TodoController } from './controllers/controllers.controller';
import { TodoService } from './services/services.service';

@Module({
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
