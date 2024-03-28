import { Entity, Column } from 'typeorm';
import type { Todo } from '../../types/todo';
import { BaseEntity } from 'src/config/base.entity';

@Entity({
  name: 'todos',
})
export class TodoEntity extends BaseEntity implements Todo {
  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({ default: false })
  completed: boolean;
}
