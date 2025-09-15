import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from '../../post/entities/post.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'user' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public provider: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public providerId: string;

  @Field(() => String)
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER, // valor por defecto
  })
  public role: Role;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public avatar: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public email: string;

  @Field(() => [Post])
  @OneToMany(() => Post, (post) => post.user, {
    lazy: true,
  })
  public post: Post[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.user, {
    lazy: true,
  })
  public comment: Comment[];

  @Field(() => [Like])
  @OneToMany(() => Like, (like) => like.user, {
    eager: true,
  })
  public like: Like[];

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
