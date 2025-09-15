import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';

import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PaginationArgs, ResponsePropio } from 'src/common';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CurrentUser, Role, User } from '../auth';

@Resolver(() => Category)
@UseGuards(AuthGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  public async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser(Role.ADMIN) _user: User,
  ): Promise<Category> {
    return await this.categoryService.create(createCategoryInput);
  }

  @Query(() => [Category], { name: 'allCategory' })
  public async findAll(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<Category[]> {
    return await this.categoryService.findAll(paginationArgs);
  }

  @Query(() => Category, { name: 'category' })
  public async findOne(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<Category> {
    return await this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  public async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @CurrentUser(Role.ADMIN) _user: User,
  ): Promise<Category> {
    return await this.categoryService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => ResponsePropio)
  public async removeCategory(
    @Args('id', { type: () => Int }, ParseIntPipe) id: number,
  ): Promise<ResponsePropio> {
    return await this.categoryService.remove(id);
  }
}
