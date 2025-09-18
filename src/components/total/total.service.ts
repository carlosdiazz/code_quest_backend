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
      total_user,
      total_sub_comment,
    ] = await Promise.all([
      this.categoryService.returnTotal(),
      this.commentService.returnTotal(),
      this.postService.returnTotal(),
      this.authService.returnTotal(),
      this.subCommentService.returnTotal(),
    ]);
    return {
      total_category,
      total_comment,
      total_sub_comment,
      total_post,
      total_user,
    };
  }
}
