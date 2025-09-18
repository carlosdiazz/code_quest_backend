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
import { Comment } from '../../comment/entities/comment.entity';
import { ENTITY_ENUM } from '../../../config';

@Entity({ name: ENTITY_ENUM.LIKE_COMMENT })
@ObjectType()
export class LikeComment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.like_comment, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => Comment)
  @ManyToOne(() => Comment, (comment) => comment.like_comment, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_comment' })
  public comment: Comment;

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
