import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskResolver } from './task.resolver';

@Module({
  imports: [
      TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TaskResolver],
})
export class TasksModule {}
