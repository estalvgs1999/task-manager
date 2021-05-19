import { Controller, Get } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskSevice.getAllTasks();
  }
}
