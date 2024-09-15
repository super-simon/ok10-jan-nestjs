import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { LoggerService } from '../logger/logger.service';
import { PostsService } from '../posts/posts.service';
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly postsService: PostsService,
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
  ) {}

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findOne(id: number): Promise<any> {
    return `This action returns a #${id} user`;
  }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(updateUserDto: UpdateUserDto): Promise<any> {
    console.log(updateUserDto);
    return `This action updates me`;
  }

  public async removeMe(): Promise<any> {
    return `This action removes me`;
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }
}
