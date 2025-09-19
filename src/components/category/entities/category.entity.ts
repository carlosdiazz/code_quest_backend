import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';

import { Post } from './../../post/entities/post.entity';
import { ENTITY_ENUM } from '../../../config';

@Entity({ name: ENTITY_ENUM.CATEGORY })
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public name: string;

  @Field(() => String)
  @Column({ type: 'varchar', default: '' })
  public description: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  public slug: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public color: string;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "${ENTITY_ENUM.POST}" l WHERE l.id_category = ${alias}.id)`,
  })
  public postCount: number;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.category, {
    eager: true,
  })
  public post: Post[];

  @Field(() => Date)
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public updateAt: Date;
}
