import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTaskFilterDTO } from './dto/get-task-filter.dto';
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
  getTasks(@Query() filterDto: GetTaskFilterDTO): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskSevice.getTaskWithFilters(filterDto);
    } else {
      return this.taskSevice.getAllTasks();
    }
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
    @Body('status') status: TaskStatus,
  ): Task {
    console.log(status);
    return this.taskSevice.updateTaskStatus(id, status);
  }
}
