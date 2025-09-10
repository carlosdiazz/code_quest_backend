import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { PaginationArgs } from 'src/common';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    throw new BadGatewayException('TODO');
  }

  public async findAll(pagination: PaginationArgs): Promise<User[]> {
    throw new BadGatewayException('TODO');
  }

  findOne(id: number) {
    throw new BadGatewayException('TODO');
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    throw new BadGatewayException('TODO');
  }

  remove(id: number) {
    throw new BadGatewayException('TODO');
  }

  public async findOrCreateFromFirebase(
    decodedIdTOken: DecodedIdToken,
  ): Promise<User> {
    const { uid, email, firebase, name } = decodedIdTOken;
    const { sign_in_provider } = firebase;

    const user = await this.userRepository.findOne({
      where: { providerId: uid },
    });

    if (user) {
      return user;
    }
    throw new BadGatewayException('TODO');
    //const userDto: CreateUserInput = {
    //  providerId: uid,
    //  email: email || 'Unknown Email',
    //  fullName: name || 'Unknown Name',
    //  provider: sign_in_provider,
    //};
    //
    //const newUser = this.userRepository.create(userDto);
    //return await this.userRepository.save(newUser);
  }
}
