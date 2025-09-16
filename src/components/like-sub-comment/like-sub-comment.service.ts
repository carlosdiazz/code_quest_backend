import { Injectable } from '@nestjs/common';
import { CreateLikeSubCommentInput } from './dto/create-like-sub-comment.input';

@Injectable()
export class LikeSubCommentService {
  create(createLikeSubCommentInput: CreateLikeSubCommentInput) {
    return 'This action adds a new likeSubComment';
  }

  findAll() {
    return `This action returns all likeSubComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} likeSubComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} likeSubComment`;
  }
}
