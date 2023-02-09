import { Project } from "src/project/entities/project.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('varchar', {length: 20})
    password: string;

    @Column('text')
    profile_pic: string; 

    @Column({
        type: 'enum', 
        enum: UserType
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

    @ManyToMany (() => Project, project => project.client_ids)
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
    
    @Column('timestamp')
    created_at: Date

    @Column('timestamp')
    updated_at: Date
    
    @Column('timestamp')
    deleted_at: Date
}
