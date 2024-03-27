import { Injectable } from '@nestjs/common';
import { Todo } from 'src/types/todo';

@Injectable()
export class TodoService {

    // TODO: 
    getTodos(): Todo[] {
        return [];
    }
}
