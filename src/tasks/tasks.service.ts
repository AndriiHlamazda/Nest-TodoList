import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from './task.entity';
import { v4 as uuid} from 'uuid';
import { CreateTaskInput}  from './task.input';


@Injectable()
export class TasksService {
     constructor(
         @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
     ) {}

    async getTasks(): Promise<Task[]> {
         return this.tasksRepository.find();
    }

    async getTaskById(id: string): Promise<Task> {
        const found = await this.tasksRepository.findOne({ id });

        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
      }
      async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
         const { title } = createTaskInput;
         const task =  this.tasksRepository.create({
             id: uuid(),
             order: new Date(),
             title,
             isDone: false,
             mode: true,
        });

        return this.tasksRepository.save(task);
   }


    async deleteTask(id: string): Promise<Task> {
       const task = await this.getTaskById(id);
       const result = await this.tasksRepository.delete(id);

       if (result.affected === 0) {
           throw new NotFoundException(`Task with ID "${id}" not found`);
       }

       return task;
   }

    async clearTask(): Promise<Task[]> {
      const result = await this.tasksRepository
            .createQueryBuilder()
            .delete()
            .from(Task)
            .where("isDone = :isDone", { isDone: true })
            .execute();

        if (!result.affected) {
            throw new NotFoundException(`Completed tasks are missing`);
        }

        return  this.tasksRepository.find();
    }

    async updateTaskStatus(id: string, isDone: boolean ): Promise<Task>{
        const task = await this.getTaskById(id);

        task.isDone = !isDone;
        await this.tasksRepository.save(task);

        return task;
    }

    async updateTask(id: string, createTaskInput: CreateTaskInput ): Promise<Task>{
        const task = await this.getTaskById(id);
        const { title } = createTaskInput;
        task.title = title;
        await this.tasksRepository.save(task);
        return task;

    }


}
