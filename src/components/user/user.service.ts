import {
  BadGatewayException,
  //BadGatewayException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//import { CreateUserInput } from './dto/create-user.input';
//import { UpdateUserInput } from './dto/update-user.input';
import { Role, User } from './entities/user.entity';
import { MESSAGE, PaginationArgs } from 'src/common';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  //create(createUserInput: CreateUserInput) {
  //  throw new BadGatewayException('TODO');
  //}

  public async findAll(pagination: PaginationArgs): Promise<User[]> {
    const { limit, offset } = pagination;

    return await this.repository.find({
      take: limit,
      skip: offset,
    });
  }

  public async findOne(id: number): Promise<User> {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) {
      throw new NotFoundException(`${MESSAGE.NO_EXISTE} => Use`);
    }
    return entity;
  }

  //update(id: number, updateUserInput: UpdateUserInput) {
  //  throw new BadGatewayException('TODO');
  //}

  //remove(id: number) {
  //  throw new BadGatewayException('TODO');
  //}

  public async findOrCreateFromFirebase(
    decodedIdTOken: DecodedIdToken,
  ): Promise<User> {
    const user: User = {
      avatar: 'www.avatar.com',
      email: 'jose@mail.coms',
      name: 'Jose',
      role: Role.ADMIN,
      provider: 'pro',
      providerId: 'proo',
      id: 1,
      createAt: new Date(),
      updateAt: new Date(),
    };

    return user;
    //const { uid, email, firebase, name } = decodedIdTOken;
    //const { sign_in_provider } = firebase;
    //
    //const user = await this.userRepository.findOne({
    //  where: { providerId: uid },
    //});
    //
    //if (user) {
    //  return user;
    //}
    //throw new BadGatewayException('TODO');
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
