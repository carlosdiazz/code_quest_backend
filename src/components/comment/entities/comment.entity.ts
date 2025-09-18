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
  VirtualColumn,
} from 'typeorm';

import { Post } from './../../post/entities/post.entity';
import { User } from '../../auth/entities/user.entity';
import { LikeComment } from '../../like-comment/entities/like-comment.entity';
import { SubComment } from '../../sub-comment/entities/sub-comment.entity';
import { ENTITY_ENUM } from '../../../config';

@Entity({ name: ENTITY_ENUM.COMMENT })
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
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_post' })
  public post: Post;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comment, {
    eager: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "like_comment" l WHERE l.id_comment = ${alias}.id)`,
  })
  public likesCount: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "sub_comment" l WHERE l.id_comment = ${alias}.id)`,
  })
  public commentCount: number;

  @Field(() => [LikeComment])
  @OneToMany(() => LikeComment, (likeComment) => likeComment.comment, {
    lazy: true,
  })
  public like_comment: LikeComment[];

  @Field(() => [SubComment])
  @OneToMany(() => SubComment, (subComment) => subComment.comment, {
    lazy: true,
  })
  public sub_comment: SubComment[];

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
