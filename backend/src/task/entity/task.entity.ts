import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entity/project.entity';
import { Notification } from '../../notification/entity/notification.entity';
import { User } from '../../user/entitity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({
    description: 'Primary key as Task ID',
    example: 'cf7d2d62-1d19-4aa3-86fe-9dcd9789a8d9',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Task Name',
    example: 'Create Navbar',
  })
  @Column()
  task_name: string;

  @ApiProperty({
    description: 'Task Link',
    example: 'https//localhost:3000',
  })
  @Column()
  link: string;

  @ApiProperty({
    description: 'Task Description',
    example: 'All Pages create navbar',
  })
  @Column()
  description: string;

  @OneToMany(() => Notification, (notification) => notification.task)
  notifications: Notification[];

  // @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'project_id' })
  // project: Project;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Foreign key
  @ApiProperty({
    description: 'User Id',
    example: 'a90sd3fd-1d19-4aa3-86fe-9dcd9789a8d9',
  })
  @Column({ nullable: true })
  user_id: string;

  // Foreign key
  // @ApiProperty({
  //   description: 'Project Id',
  //   example: 'hde3d345w3-1d19-4aa3-86fe-9dcd9789a8d9',
  // })
  // @Column({ nullable: true })
  // project_id: string;
}
