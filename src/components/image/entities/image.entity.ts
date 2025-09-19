import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ENTITY_ENUM } from '../../../config';
import { Post } from '../../post/entities/post.entity';

@Entity({ name: ENTITY_ENUM.IMAGE })
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  public id: number;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public secure_url: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  public public_id: string;

  @Field(() => Post, { nullable: true })
  @OneToOne(() => Post, (post) => post.image)
  public post?: Post;

  @Field(() => Date)
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  public createAt: Date;
}
