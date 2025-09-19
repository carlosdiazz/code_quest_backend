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
import { LikePost } from '../../like-post/entities/like-post.entity';
import { LikeComment } from '../../like-comment/entities/like-comment.entity';
import { SubComment } from '../../sub-comment/entities/sub-comment.entity';
import { LikeSubComment } from '../../like-sub-comment/entities/like-sub-comment.entity';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
import { ENTITY_ENUM } from '../../../config';
import { PostView } from '../../post-view/entities/post-view.entity';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: ENTITY_ENUM.USER })
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

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public about?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public twitter_url?: string;

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  public instagram_url?: string;

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

  @Field(() => [SubComment])
  @OneToMany(() => SubComment, (subComment) => subComment.user, {
    lazy: true,
  })
  public sub_comment: SubComment[];

  @Field(() => [LikePost])
  @OneToMany(() => LikePost, (likePost) => likePost.user, {
    lazy: true,
  })
  public like_post: LikePost[];

  @Field(() => [PostView])
  @OneToMany(() => PostView, (postView) => postView.user, {
    lazy: true,
  })
  public post_view: PostView[];

  @Field(() => [Bookmark])
  @OneToMany(() => Bookmark, (bookMark) => bookMark.user, {
    lazy: true,
  })
  public bookmark_post: Bookmark[];

  @Field(() => [LikeComment])
  @OneToMany(() => LikeComment, (likeComment) => likeComment.user, {
    lazy: true,
  })
  public like_comment: LikeComment[];

  @Field(() => [LikeSubComment])
  @OneToMany(() => LikeSubComment, (likeSubComment) => likeSubComment.user, {
    lazy: true,
  })
  public like_sub_comment: LikeComment[];

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
