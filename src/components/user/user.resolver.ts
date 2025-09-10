import {
  Resolver,
  Query,
  //Mutation,
  Args,
  Int,
} from '@nestjs/graphql';

import { UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
//import { CreateUserInput } from './dto/create-user.input';
//import { UpdateUserInput } from './dto/update-user.input';
import { AuthGuard } from './guard/auth.guard';
import { PaginationArgs } from 'src/common';

@Resolver(() => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'allUser' })
  public async findAll(@Args() pagination: PaginationArgs): Promise<User[]> {
    return await this.userService.findAll(pagination);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  //@Mutation(() => User)
  //updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //  return this.userService.update(updateUserInput.id, updateUserInput);
  //}

  //@Mutation(() => User)
  //removeUser(@Args('id', { type: () => Int }) id: number) {
  //  return this.userService.remove(id);
  //}
}
