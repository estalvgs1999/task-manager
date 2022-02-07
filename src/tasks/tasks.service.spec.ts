import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'john',
  id: 'ab12cd34',
  password: 'securePas5word!',
  tasks: [],
};

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with tasksService and tasksRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TaskRepository.getTasks and returns the result', async () => {
      // call tasksService.getTasks, which should then call the repository's getTasks
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTAskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Test title',
        description: 'Test desc',
        id: 'SomeId',
        status: TaskStatus.OPEN,
      };

      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('SomeId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('SomeId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
