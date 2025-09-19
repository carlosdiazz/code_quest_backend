import { Injectable } from '@nestjs/common';
import { TotalResponse } from './total.response';
import { AuthService } from '../auth';
import { PostService } from '../post';
import { CategoryService } from '../category';
import { CommentService } from '../comment';
import { SubCommentService } from '../sub-comment';

@Injectable()
export class TotalService {
  constructor(
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly categoryService: CategoryService,
    private readonly commentService: CommentService,
    private readonly subCommentService: SubCommentService,
  ) {}

  public async totalResponse(): Promise<TotalResponse> {
    const [
      total_category,
      total_comment,
      total_post,
      total_post_published,
      total_user,
      total_sub_comment,
      total_view,
    ] = await Promise.all([
      this.categoryService.returnTotal(),
      this.commentService.returnTotal(),
      this.postService.returnTotal(),
      this.postService.returnTotalPublished(),
      this.authService.returnTotal(),
      this.subCommentService.returnTotal(),
      this.postService.totalViewByUser(),
    ]);
    return {
      total_category,
      total_comment,
      total_sub_comment,
      total_post,
      total_user,
      total_view,
      total_post_published,
    };
  }
}
