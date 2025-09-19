import { Injectable, Logger } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { ResponsePropio } from '../../common';
import { Category, CategoryService, CreateCategoryInput } from '../category';
import { AuthService, CreateUserInput, Role, User } from '../auth';
import { CreatePostInput, Post, PostService } from '../post';
import { CommentService, Comment, CreateCommentInput } from '../comment';
import {
  CreateSubCommentInput,
  SubComment,
  SubCommentService,
} from '../sub-comment';
import { LikePostService } from '../like-post';
import { LikeCommentService } from '../like-comment';
import { LikeSubCommentService } from '../like-sub-comment';
import { BookmarkService } from '../bookmark';
import { PostViewService } from '../post-view';
import { Image, ImageService } from '../image';

@Injectable()
export class SeedService {
  private readonly logger = new Logger('SeedService');
  constructor(
    private readonly categoryService: CategoryService,
    private readonly authService: AuthService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
    private readonly subCommentService: SubCommentService,
    private readonly likePostService: LikePostService,
    private readonly likeCommetService: LikeCommentService,
    private readonly likeSubCommentService: LikeSubCommentService,
    private readonly bookMarkService: BookmarkService,
    private readonly postViewService: PostViewService,
    private readonly imageService: ImageService,
  ) {}

  public async execSeed(): Promise<ResponsePropio> {
    const category = await this.createCategory();
    await this.createUser();
    const post = await this.createPost(category);
    const comment = await this.createComment(post);
    await this.createSubComment(comment);
    return {
      message: 'Seed Creado',
      statusCode: 200,
    };
  }

  private async usuarioAleatorio(): Promise<User> {
    const { items } = await this.authService.findAll({
      limit: 10,
      offset: 0,
      active: true,
    });

    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  }

  private async createCategory(): Promise<Category[]> {
    const arr_category: Category[] = await this.categoryService.findAll({
      limit: 10,
      offset: 0,
      active: true,
    });

    if (arr_category.length >= 1) return arr_category;

    for (let index = 0; index < 10; index++) {
      const createPost: CreateCategoryInput = {
        color: faker.color.rgb({ prefix: '#' }), // genera un color random
        name: faker.commerce.department(),
        slug: faker.helpers.slugify(faker.commerce.department()),
        description: faker.commerce.productDescription(),
      };

      try {
        const new_entity = await this.categoryService.create(createPost);
        this.logger.debug(`Categoria Nueva ${new_entity.name}`);
        arr_category.push(new_entity);
      } catch {
        this.logger.error(`No pudo crearse la category => ${createPost.name}`);
      }
    }

    return arr_category;
  }

  private async createUser(): Promise<User[]> {
    const { items } = await this.authService.findAll({
      limit: 10,
      offset: 0,
      active: true,
    });

    if (items.length >= 1) return items;

    for (let index = 0; index < 5; index++) {
      const createUser: CreateUserInput = {
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        provider: 'seed',
        providerId: faker.string.uuid(),
        role: Role.ADMIN,
      };

      try {
        const new_entity = await this.authService.createMock(createUser);
        this.logger.debug(`User Nuevo ${new_entity.name}`);
        items.push(new_entity);
      } catch {
        this.logger.error(`No pudo crearse el Usuario => ${createUser.name}`);
      }
    }

    return items;
  }

  private async createPost(categorys: Category[]): Promise<Post[]> {
    const { items } = await this.postService.findAll({
      limit: 10,
      offset: 0,
      active: true,
    });

    if (items.length >= 1) return items;

    for (const category of categorys) {
      for (let index = 0; index < 5; index++) {
        try {
          const image = await this.createImage();

          const createPost: CreatePostInput = {
            content: faker.lorem.paragraphs(2),
            excerpt: faker.lorem.sentence(),
            featured: faker.datatype.boolean(),
            id_category: category.id,
            published: faker.datatype.boolean(),
            slug: faker.helpers.slugify(faker.lorem.words(3)),
            tags: faker.lorem.words(3).split(' '),
            title: faker.lorem.sentence(),
            id_image: image.id,
          };

          const user = await this.usuarioAleatorio();

          const new_entity = await this.postService.create(createPost, user);
          if (new_entity.published && new_entity.featured) {
            await this.likePostService.create({ id_post: new_entity.id }, user);
          }
          if (faker.datatype.boolean()) {
            await this.postViewService.create({
              id_post: new_entity.id,
              id_user: user.id,
            });
            await this.bookMarkService.create({ id_post: new_entity.id }, user);
          }

          this.logger.debug(`Post Nuevo ${new_entity.title}`);
          items.push(new_entity);
        } catch {
          this.logger.error(`No pudo crearse el post`);
        }
      }
    }

    return items;
  }

  private async createComment(posts: Post[]): Promise<Comment[]> {
    const items = await this.commentService.findAll({
      limit: 10,
      offset: 0,
      active: true,
    });

    if (items.length >= 1) return items;

    for (const post of posts) {
      for (let index = 0; index < 3; index++) {
        const createComment: CreateCommentInput = {
          content: faker.lorem.paragraphs(2),
          id_post: post.id,
        };

        try {
          const user = await this.usuarioAleatorio();
          const new_entity = await this.commentService.create(
            createComment,
            user,
          );
          if (faker.datatype.boolean()) {
            await this.likeCommetService.create(
              { id_comment: new_entity.id },
              user,
            );
          }
          this.logger.debug(`Comentario Nuevo ${new_entity.content}`);
          items.push(new_entity);
        } catch {
          this.logger.error(
            `No pudo crearse la category => ${createComment.content}`,
          );
        }
      }
    }

    return items;
  }

  private async createSubComment(comments: Comment[]): Promise<SubComment[]> {
    const items = await this.subCommentService.findAll({
      limit: 10,
      offset: 0,
      active: true,
    });

    if (items.length >= 1) return items;

    for (const comment of comments) {
      for (let index = 0; index < 2; index++) {
        const createSubComment: CreateSubCommentInput = {
          content: faker.lorem.paragraphs(2),
          id_comment: comment.id,
        };

        try {
          const user = await this.usuarioAleatorio();
          const new_entity = await this.subCommentService.create(
            createSubComment,
            user,
          );
          if (faker.datatype.boolean()) {
            await this.likeSubCommentService.create(
              { id_sub_comment: new_entity.id },
              user,
            );
          }
          this.logger.debug(`Comentario Nuevo ${new_entity.content}`);
          items.push(new_entity);
        } catch {
          this.logger.error(
            `No pudo crearse la category => ${createSubComment.content}`,
          );
        }
      }
    }

    return items;
  }

  private async createImage(): Promise<Image> {
    const public_id = faker.string.uuid(); // ID único
    const secure_url = faker.image.urlPicsumPhotos({ width: 800, height: 600 });

    return await this.imageService.create(public_id, secure_url);
  }
}
