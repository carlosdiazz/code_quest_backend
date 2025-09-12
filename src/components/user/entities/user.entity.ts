import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'user' })
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

  @Field(() => String)
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
