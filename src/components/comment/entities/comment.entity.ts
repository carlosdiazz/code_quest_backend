import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from './../../post/entities/post.entity';
import { User } from './../../user/entities/user.entity';

@Entity({ name: 'comment' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public content: string;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comment, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_post' })
  post: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comment, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_user' })
  user: User;

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
