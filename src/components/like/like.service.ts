import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLikeInput } from './dto/create-like.input';

import { Like } from './entities/like.entity';
import { PaginationArgs, ResponsePropio } from 'src/common';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private readonly repository: Repository<Like>,
  ) {}

  public async create(createLikeInput: CreateLikeInput): Promise<Like> {
    throw new BadGatewayException('TODO');
    //const { id_post } = createLikeInput;
    //
    //try {
    //  const newEntity = this.repository.create({
    //    slug,
    //    ...rest,
    //  });
    //  const entity = await this.repository.save(newEntity);
    //  return await this.findOne(entity.id);
    //} catch (error) {
    //  throw new UnprocessableEntityException(error?.message);
    //}
  }

  public async findAll(paginationArgs: PaginationArgs): Promise<Like[]> {
    throw new BadGatewayException('TODO'); //return `This action returns all like`;
  }

  public async findOne(id: number): Promise<Like> {
    throw new BadGatewayException('TODO');
    //return `This action returns a #${id} like`;
  }

  public async remove(id: number): Promise<ResponsePropio> {
    throw new BadGatewayException('TODO');
    //return `This action removes a #${id} like`;
  }
}
