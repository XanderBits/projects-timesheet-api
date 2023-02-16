import { Project } from "src/project/entities/project.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum UserType{
    'CLIENT',
    'EMPLOYEER'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', {length: 50})
    name: string;

    @Column('varchar', {length: 50})
    lastname: string; 

    @Column('text',{ unique: true })
    email: string;

    @Column('varchar')
    password: string;

    @Column('text', {default: "../../../public/pictures/default-profile-picture.jpg"})
    profile_pic: string; 

    @Column({
        type: 'enum', 
        enum: UserType,
        default: 0
    })
    user_type: UserType 

    @ManyToMany( () => Role, role => role.user_ids)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'user_ids',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'role_ids',
            referencedColumnName: 'id'
        }
    })
    role_ids: Role[]

    @ManyToMany (() => Project, project => project.client_ids, {nullable: true})
    @JoinTable({ 
        name: 'user_employer_project',
        joinColumn: {
            name: 'employer_ids',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'project_id',
            referencedColumnName: 'id'
        }
    })
    project_ids: Project[] 
    
    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
      })
    created_at: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
      })
    updated_at: Date
    
    @Column('timestamp', {default: null})
    deleted_at: Date
}
