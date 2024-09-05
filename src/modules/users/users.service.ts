import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';
import { PostsService } from '../posts/posts.service';
import { CreateUserDto } from './dto/req/create-user.dto';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly postsService: PostsService,
    private readonly logger: LoggerService,
  ) {}
  public async create(createUserDto: CreateUserDto): Promise<any> {
    this.postsService.create({});
    return createUserDto;
  }

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findOne(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }

  public async findMe(): Promise<any> {
    return `This action returns me`;
  }

  public async updateMe(updateUserDto: UpdateUserDto): Promise<any> {
    console.log(updateUserDto);
    return `This action updates me`;
  }

  public async removeMe(): Promise<any> {
    return `This action removes me`;
  }
}
