import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create.task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskSevice: TasksService) {}

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.taskSevice.getTaskById(id);
  }

  @Get()
  getAllTasks(): Task[] {
    return this.taskSevice.getAllTasks();
  }

  @Post()
  crateTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskSevice.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task {
    return this.taskSevice.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Param('status') status: TaskStatus,
  ): Task {
    return this.taskSevice.updateTaskStatus(id, status);
  }
}
