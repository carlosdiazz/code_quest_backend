import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ENTITY_ENUM } from '../../../config';
import { User } from '../../auth/entities/user.entity';
import { Post } from '../../post/entities/post.entity';

@Entity({ name: ENTITY_ENUM.POST_VIEW })
@ObjectType()
export class PostView {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.post_view, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.like_post, {
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
}
