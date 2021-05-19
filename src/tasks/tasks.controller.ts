import { Controller, Get, Post, Body } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskSevice.getAllTasks();
  }

  @Post()
  crateTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskSevice.createTask(title, description);
  }
}
