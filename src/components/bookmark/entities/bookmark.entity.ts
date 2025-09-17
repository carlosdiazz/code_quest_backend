import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../auth/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
@Entity({ name: 'bookmark_post' })
export class Bookmark {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.bookmark_post, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.bookmark_post, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_post' })
  public post: Post;

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
