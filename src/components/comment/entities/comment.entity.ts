import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from './../../post/entities/post.entity';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'comment' })
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public content: string;

  // RELACIÓN RECURSIVA
  @Field(() => Comment, { nullable: true })
  @ManyToOne(() => Comment, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  public parent?: Comment;

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.parent)
  public replies?: Comment[];

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.comment, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_post' })
  public post: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comment, {
    eager: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

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
