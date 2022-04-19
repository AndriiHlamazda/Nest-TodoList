import {
  Args, Mutation, Query, Resolver,
} from '@nestjs/graphql';
import { TaskType } from './task.type';
import { TasksService } from './tasks.service';
import { CreateTaskInput } from './task.input';

@Resolver((of) => TaskType)
export class TaskResolver {
  constructor(
private tasksService: TasksService,
  ) {}

    @Query((returns) => [TaskType])
  tasks() {
    return this.tasksService.getTasks();
  }

       @Mutation((returns) => TaskType)
    createTask(
        @Args('createTaskInput') createTaskInput : CreateTaskInput,
    ) {
      return this.tasksService.createTask(createTaskInput);
    }

     @Mutation((returns) => TaskType)
       deleteTask(
         @Args('id') id: string,
       ) {
         return this.tasksService.deleteTask(id);
       }

     @Mutation((returns) => [TaskType])
     clearTask() {
       return this.tasksService.clearTask();
     }

    @Mutation((returns) => TaskType)
     updateTaskStatus(
        @Args('id') id: string,
        @Args('isDone') isDone: boolean,
     ) {
       return this.tasksService.updateTaskStatus(id, isDone);
     }

    @Mutation((returns) => TaskType)
    updateTask(
        @Args('id') id: string,
        @Args('createTaskInput') createTaskInput : CreateTaskInput,
    ) {
      return this.tasksService.updateTask(id, createTaskInput);
    }
}
