import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = this.projectRepository.create(createProjectDto);
      await this.projectRepository.save(project);
      return project;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll() {
    const projects = this.projectRepository.find();
    return projects;
  }

  async findOne(id: string) {
    let project: Project;

    if (isUUID(id)) {
      project = await this.projectRepository.findOne({ where: { id: id } });
    }
    if (!project)
      throw new BadRequestException(`project with ID ${id} not found`);

    return project;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({
      id: id,
      ...updateProjectDto,
    });

    if (!project)
      throw new BadRequestException(`project with ID ${id} not found`);
    try {
      await this.projectRepository.save(project);
      return project;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const project = await this.findOne(id);
    await this.projectRepository.remove(project);
  }

  private handleDBErrors(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    throw new InternalServerErrorException(`Please check server logs`);
  }
}
