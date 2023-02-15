import { User } from 'src/auth/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AllowedStatus {
  notStarted = 'NOT_STARTED',
  inProgress = 'IN_PROGRESS',
  completed = 'COMPLETED',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('char', { unique: true, length: 50 })
  name: string;

  @Column('char', { length: 255, nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: AllowedStatus,
    default: AllowedStatus.notStarted
  })
  status: AllowedStatus;

  @ManyToMany(() => User, (user) => user.project_ids)
  employer_ids: User[];

  @ManyToOne(() => User, (user) => user.project_ids)
  client_ids: User[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  deleteAt: Date;
}
