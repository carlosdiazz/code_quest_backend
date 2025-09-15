import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { Role, User } from './entities/user.entity';

import { PaginationArgs } from 'src/common';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthGuard } from './guard/auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { ResponseAllUserDTO } from './dto/response-all-user.dto';

@Resolver(() => User)
@UseGuards(AuthGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => ResponseAllUserDTO, { name: 'allUser' })
  public async findAll(
    @Args() pagination: PaginationArgs,
  ): Promise<ResponseAllUserDTO> {
    return await this.userService.findAll(pagination);
  }

  @Query(() => User, { name: 'user' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser(Role.ADMIN) _user: User,
  ) {
    return await this.userService.update(
      updateUserInput.id,
      updateUserInput,
      _user,
    );
  }

  //@Mutation(() => User)
  //removeUser(@Args('id', { type: () => Int }) id: number) {
  //  return this.userService.remove(id);
  //}
}
