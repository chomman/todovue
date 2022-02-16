/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { User } from './user.entity';

/**
 * A Todo.
 */
@Entity('todo')
export class Todo extends BaseEntity {
    @Column({ name: 'title' })
    title: string;

    @Column({ type: 'boolean', name: 'done', nullable: true })
    done: boolean;

    @ManyToOne((type) => User)
    user: User;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
