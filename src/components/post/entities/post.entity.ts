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

import { Category } from './../../category/entities/category.entity';
import { Comment } from './../../comment/entities/comment.entity';
import { User } from '../../auth/entities/user.entity';
import { LikePost } from '../../like-post/entities/like-post.entity';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
@Entity({ name: 'post' })
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

  @Field(() => String)
  @Column({ type: 'varchar' })
  public coverImage: string;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  public published: boolean;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  public featured: boolean;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "like_post" l WHERE l.id_post = ${alias}.id)`,
  })
  public likesCount: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "bookmark_post" l WHERE l.id_post = ${alias}.id)`,
  })
  public bookmarkCount: number;

  @Field(() => Int)
  @VirtualColumn({
    query: (alias) =>
      `(SELECT COUNT(*) FROM "comment" l WHERE l.id_post = ${alias}.id)`,
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
