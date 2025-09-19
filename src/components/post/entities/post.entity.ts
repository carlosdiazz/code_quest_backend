import { ObjectType, Field, Int } from '@nestjs/graphql';

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';

import { ENTITY_ENUM } from '../../../config';

import { Category } from './../../category/entities/category.entity';
import { Comment } from './../../comment/entities/comment.entity';
import { User } from '../../auth/entities/user.entity';
import { LikePost } from '../../like-post/entities/like-post.entity';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
import { PostView } from '../../post-view/entities/post-view.entity';
import { Image } from '../../image/entities/image.entity';

@Entity({ name: ENTITY_ENUM.POST })
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public title: string;

  @Field(() => String)
  @Column({ type: 'varchar', unique: true })
  public slug: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public content: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public excerpt: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  public published: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  public featured: boolean;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  public total_view: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "${ENTITY_ENUM.LIKE_POST}" l WHERE l.id_post = ${alias}.id)`,
  })
  public likesCount: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "${ENTITY_ENUM.BOOKMARK_POST}" l WHERE l.id_post = ${alias}.id)`,
  })
  public bookmarkCount: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "${ENTITY_ENUM.POST_VIEW}" l WHERE l.id_post = ${alias}.id)`,
  })
  public viewUserCount: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "${ENTITY_ENUM.COMMENT}" l WHERE l.id_post = ${alias}.id)`,
  })
  public commentCount: number;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true, default: [] })
  public tags: string[];

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.post, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_category' })
  public category: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.post, {
    eager: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => [LikePost])
  @OneToMany(() => LikePost, (likePost) => likePost.post, {
    eager: true,
  })
  public like_post: LikePost[];

  @Field(() => [PostView])
  @OneToMany(() => PostView, (postView) => postView.post, {
    eager: true,
  })
  public post_view: PostView[];

  @Field(() => [Bookmark])
  @OneToMany(() => Bookmark, (bookMark) => bookMark.post, {
    eager: true,
  })
  public bookmark_post: Bookmark[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post, {
    eager: true,
  })
  public comment: Comment[];

  @Field(() => Image, { nullable: true })
  @OneToOne(() => Image, (image) => image.post, {
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'id_image' })
  public image?: Image;

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
