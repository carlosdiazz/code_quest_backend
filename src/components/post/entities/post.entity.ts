import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column({ type: 'int' })
  public likesCount: number;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true, default: [] })
  public tags: string[];

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
