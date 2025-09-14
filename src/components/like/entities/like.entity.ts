import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Post } from './../../post/entities/post.entity';
import { User } from './../../user/entities/user.entity';

@Entity({ name: 'like' })
@ObjectType()
export class Like {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.like, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => Post)
  @ManyToOne(() => Post, (post) => post.like, {
    lazy: true,
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
