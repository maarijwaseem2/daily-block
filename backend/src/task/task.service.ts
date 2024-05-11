import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { CreateTaskDto } from './dto/createTask.dto';
import { Project } from '../project/entity/project.entity';
import { errorMessages, taskMessages } from 'src/shared/constant/constant';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const task = this.taskRepository.create({
        task_name: createTaskDto.task_name,
        link: createTaskDto.link,
        description: createTaskDto.description,
        user_id: createTaskDto.user_id,
      });
      const savedTask = await this.taskRepository.save(task);
      const firstWithId = await this.taskRepository.findOne({
        where: { id: savedTask.id },
      });
      return {
        message: taskMessages.taskCreate,
        data: firstWithId,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // async create(projectId: string, createTaskDto: CreateTaskDto) {
  //   const project = await this.projectRepository.findOne({
  //     where: { id: projectId },
  //   });
  //   if (!project) {
  //     throw new NotFoundException(`Project with ID ${projectId} not found`);
  //   }
  //   const task = this.taskRepository.create({
  //     task_name: createTaskDto.task_name,
  //     link: createTaskDto.link,
  //     description: createTaskDto.project_id,
  //     user_id: createTaskDto.user_id,
  //     project_id: projectId,
  //   });
  //   const savedTask = await this.taskRepository.save(task);
  //   const firstWithId = await this.taskRepository.findOne({
  //     where: { id: savedTask.id },
  //   });
  //   return {
  //     message: taskMessages.taskCreate,
  //     data: firstWithId,
  //   };
  // }
  async findAll() {
    try {
      const detail = await this.taskRepository.find();
      return {
        message: taskMessages.allDetail,
        data: detail,
      };
    } catch (error) {
      throw new InternalServerErrorException(errorMessages.serverError);
    }
  }

  async findById(id: string) {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(errorMessages.notFoundTask);
    }
    return {
      message: taskMessages.detailById,
      data: task,
    };
  }

  async delete(id: string) {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new NotFoundException(errorMessages.notFoundTask);
    }
    await this.taskRepository.remove(task);
    return {
      message: taskMessages.taskDelete,
      data: task,
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(errorMessages.notFoundTask);
    }
    const updatedFields: Partial<Task> = {};
    if (updateTaskDto.task_name) {
      updatedFields.task_name = updateTaskDto.task_name;
    }
    if (updateTaskDto.link) {
      updatedFields.link = updateTaskDto.link;
    }
    if (updateTaskDto.description) {
      updatedFields.description = updateTaskDto.description;
    }
    if (updateTaskDto.user_id) {
      updatedFields.user_id = updateTaskDto.user_id;
    }
    await this.taskRepository.update(id, updatedFields);
    const updatedTask = await this.taskRepository.findOne({
      where: { id },
    });
    return {
      message: taskMessages.taskUpdate,
      data: updatedTask,
    };
  }
}
