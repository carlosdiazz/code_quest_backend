import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { User } from './entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { ResponseAllUserDTO } from './dto/response-all-user.dto';
import { AuthService } from './auth.service';

import { PaginationArgs } from '../../common';
@Resolver(() => User)
@UseGuards(AuthGuard)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => ResponseAllUserDTO, { name: 'allUser' })
  public async findAll(
    @Args() pagination: PaginationArgs,
  ): Promise<ResponseAllUserDTO> {
    return await this.authService.findAll(pagination);
  }

  @Query(() => User, { name: 'user' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.authService.findOne(id);
  }

  @Query(() => User, { name: 'checkProfile' })
  public async checkProfile(@CurrentUser() user: User): Promise<User> {
    return await this.authService.findOne(user.id);
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser() user: User,
  ) {
    return await this.authService.update(
      updateUserInput.id,
      updateUserInput,
      user,
    );
  }
}
