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
import { SubComment } from '../../sub-comment/entities/sub-comment.entity';

@Entity({ name: 'like_sub_comment' })
@ObjectType()
export class LikeSubComment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.like_sub_comment, {
    lazy: true,
  })
  @JoinColumn({ name: 'id_user' })
  public user: User;

  @Field(() => SubComment)
  @ManyToOne(() => SubComment, (subComment) => subComment.like_sub_comment, {
    lazy: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_sub_comment' })
  public sub_comment: SubComment;

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
