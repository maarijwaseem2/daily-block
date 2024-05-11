import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { errorMessages, projectMessage } from 'src/shared/constant/constant';
import { CreateProjectDTO } from './dto/createProject.dto';
import { UpdateProjectDTO } from './dto/updateProject.dto';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  private formatResponse(message: string, data: any) {
    return { message, data };
  }

  async create(
    createProjectDto: CreateProjectDTO,
    file: Express.Multer.File,
  ): Promise<{ message: string; data: any }> {
    try {
      const newProject = this.projectRepository.create({
        project_name: createProjectDto.project_name,
        category: createProjectDto.category,
        start_date: createProjectDto.start_date,
        end_date: createProjectDto.end_date,
        upload_cover_image: file.filename,
      });

      const savedProject = await this.projectRepository.save(newProject);
      const firstWithId = await this.projectRepository.findOne({
        where: { id: savedProject.id },
      });

      return this.formatResponse(projectMessage.projectCreate, firstWithId);
    } catch (error) {
      throw new InternalServerErrorException(errorMessages.serverError);
    }
  }

  async getAllProjects(): Promise<{ message: string; data: Project[] }> {
    try {
      const detail = await this.projectRepository.find();
      return {
        message: projectMessage.allDetail,
        data: detail,
      };
    } catch (error) {
      throw new InternalServerErrorException(errorMessages.serverError);
    }
  }

  async getProjectById(id: string) {
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });
    if (!project) {
      throw new NotFoundException(errorMessages.notFoundProject);
    }
    return {
      message: projectMessage.detailById,
      data: project,
    };
  }

  async deleteProject(id: string) {
    const user = await this.projectRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(errorMessages.notFoundProject);
    }
    await this.projectRepository.remove(user);
    return {
      message: projectMessage.projectDelete,
    };
  }

  async updateProject(
    id: string,
    updateProjectDto: UpdateProjectDTO,
    file: Express.Multer.File,
  ) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(errorMessages.notFoundProject);
    }
    const updatedFields: Partial<Project> = {};
    if (updateProjectDto.project_name) {
      updatedFields.project_name = updateProjectDto.project_name;
    }
    if (updateProjectDto.category) {
      updatedFields.category = updateProjectDto.category;
    }
    if (updateProjectDto.start_date) {
      updatedFields.start_date = updateProjectDto.start_date;
    }
    if (updateProjectDto.end_date) {
      updatedFields.end_date = updateProjectDto.end_date;
    }
    if (file) {
      updatedFields.upload_cover_image = file.filename;
    }

    await this.projectRepository.update(id, updatedFields);
    const updatedProject = await this.projectRepository.findOne({
      where: { id },
    });
    return {
      message: projectMessage.projectUpdate,
      data: updatedProject,
    };
  }
}
