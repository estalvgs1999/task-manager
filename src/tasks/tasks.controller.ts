import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
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
  crateTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskSevice.createTask(createTaskDto);
  }
}
