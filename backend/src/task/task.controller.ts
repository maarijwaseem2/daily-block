import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/createTask.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/updateTask.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorMessages, taskMessages } from 'src/shared/constant/constant';
import { Task } from './entity/task.entity';

@ApiTags('Task')
@Controller('task')
@UseGuards(new JwtAuthGuard())
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({
    description: taskMessages.taskCreate,
    type: Task,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundProject,
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.create(createTaskDto);
  }
  // @Post(':projectId')
  // @ApiCreatedResponse({
  //   description: taskMessages.taskCreate,
  //   type: Task,
  // })
  // @ApiBadRequestResponse({
  //   description: errorMessages.notFoundProject,
  // })
  // async create(
  //   @Param('projectId', ParseUUIDPipe) projectId: string,
  //   @Body() createTaskDto: CreateTaskDto,
  // ) {
  //   return await this.taskService.create(projectId, createTaskDto);
  // }

  @Get()
  @ApiOkResponse({
    description: taskMessages.allDetail,
    type: Task,
  })
  @ApiServiceUnavailableResponse({
    description: errorMessages.serverError,
  })
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: taskMessages.detailById,
    type: Task,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundTask,
  })
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.findById(id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: taskMessages.taskDelete,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundTask,
  })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.delete(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: taskMessages.taskUpdate,
    type: Task,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundTask,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }
}
