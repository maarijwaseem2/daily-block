import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProjectDTO } from './dto/createProject.dto';
import { ProjectService } from './project.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './middleware/file-upload.middleware';
import { UpdateProjectDTO } from './dto/updateProject.dto';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiServiceUnavailableResponse,
  ApiTags,
} from '@nestjs/swagger';
import { errorMessages, projectMessage } from 'src/shared/constant/constant';
import { Project } from './entity/project.entity';

@ApiTags('Project')
@ApiExtraModels(CreateProjectDTO)
@Controller('project')
@UseGuards(new JwtAuthGuard())
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @ApiProperty({
    description: 'Message',
    example: 'Project created successfully',
  })
  @ApiCreatedResponse({
    description: projectMessage.projectCreate,
    type: Project,
  })
  @ApiServiceUnavailableResponse({
    description: errorMessages.serverError,
  })
  @UseInterceptors(FileInterceptor('upload_cover_image', multerOptions))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createProjectDto: CreateProjectDTO,
    @UploadedFile() file,
  ) {
    return await this.projectService.create(createProjectDto, file);
  }

  @Get()
  @ApiOkResponse({
    description: projectMessage.allDetail,
    type: Project,
  })
  @ApiServiceUnavailableResponse({
    description: errorMessages.serverError,
  })
  async getAllProjects() {
    return await this.projectService.getAllProjects();
  }

  @Get(':id')
  @ApiOkResponse({
    description: projectMessage.detailById,
    type: Project,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundProject,
  })
  async getProjectById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectService.getProjectById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: projectMessage.projectUpdate,
    type: Project,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundProject,
  })
  @UseInterceptors(FileInterceptor('upload_cover_image', multerOptions))
  @ApiConsumes('multipart/form-data')
  async updateProject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectDto: UpdateProjectDTO,
    @UploadedFile() file,
  ) {
    return await this.projectService.updateProject(id, updateProjectDto, file);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: projectMessage.projectDelete,
  })
  @ApiBadRequestResponse({
    description: errorMessages.notFoundProject,
  })
  async deleteProject(@Param('id', ParseUUIDPipe) id: string) {
    return await this.projectService.deleteProject(id);
  }
}
