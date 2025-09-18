import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role, User } from './entities/user.entity';
import { MESSAGE, PaginationArgs } from 'src/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { ResponseAllUserDTO } from './dto/response-all-user.dto';
import { WsGateway, WsTotalResponse } from '../ws';
import { ENTITY_ENUM } from 'src/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
    private readonly wsGateway: WsGateway,
  ) {}

  public async findAll(
    pagination: PaginationArgs,
  ): Promise<ResponseAllUserDTO> {
    const { limit, offset } = pagination;

    const total = await this.repository.count();

    const items = await this.repository.find({
      take: limit,
      skip: offset * limit,
    });

    return {
      items,
      total,
    };
  }

  public async findOne(id: number): Promise<User> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Use`);
    }
    return entity;
  }

  public async update(
    id: number,
    updateUserInput: UpdateUserInput,
    user: User,
  ): Promise<User> {
    const entity = await this.findOne(id);
    //todo soloa tualizar el mismo suer al emnso que sea admin
    try {
      this.repository.merge(entity, updateUserInput);
      return await this.repository.save(entity);
    } catch (error) {
      throw new UnprocessableEntityException(error?.message);
    }
  }

  //remove(id: number) {
  //  throw new BadGatewayException('TODO');
  //}

  public async findOrCreateFromFirebase(
    decodedIdTOken: DecodedIdToken,
  ): Promise<User> {
    const { uid } = decodedIdTOken;

    const user = await this.repository.findOne({
      where: { providerId: uid },
    });

    if (user) {
      return user;
    }
    return await this.create(decodedIdTOken);
  }

  private async create(decodedIdTOken: DecodedIdToken): Promise<User> {
    const { uid, email, firebase, picture, name } = decodedIdTOken;
    const { sign_in_provider } = firebase;
    const userDto: CreateUserInput = {
      providerId: uid,
      email: email || 'Unknown Email',
      name: name || 'Unknown Name',
      role: Role.USER,
      avatar:
        picture ||
        'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png',
      provider: sign_in_provider,
    };

    const newUser = this.repository.create(userDto);
    await this.wsTotal();
    return await this.repository.save(newUser);
  }

  public async returnTotal(): Promise<number> {
    try {
      return await this.repository.count();
    } catch {
      return 0;
    }
  }

  private async wsTotal() {
    const total = await this.returnTotal();
    const ms: WsTotalResponse = { topic: ENTITY_ENUM.USER, total };
    this.wsGateway.sendEmitTotal(ms);
  }
}
