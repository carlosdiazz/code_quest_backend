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

import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../auth/entities/user.entity';
import { LikeSubComment } from '../../like-sub-comment/entities/like-sub-comment.entity';

@Entity({ name: 'sub_comment' })
@ObjectType()
export class SubComment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public content: string;

  @Field(() => Comment)
  @ManyToOne(() => Comment, (comment) => comment.sub_comment, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_comment' })
  public comment: Comment;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.sub_comment, {
    eager: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => [LikeSubComment])
  @OneToMany(
    () => LikeSubComment,
    (likeSubComment) => likeSubComment.sub_comment,
    {
      lazy: true,
    },
  )
  public like_sub_comment: LikeSubComment[];

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "like_sub_comment" l WHERE l.id_sub_comment = ${alias}.id)`,
  })
  public likesCount: number;

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
