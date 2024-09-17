import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { AuthCacheService } from '../auth/services/auth-cache.service';
import { ContentType } from '../file-storage/enums/content-type.enum';
import { FileStorageService } from '../file-storage/services/file-storage.service';
import { LoggerService } from '../logger/logger.service';
import { FollowRepository } from '../repository/services/follow.repository';
import { UserRepository } from '../repository/services/user.repository';
import { UpdateUserDto } from './dto/req/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly fileStorageService: FileStorageService,
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly authCacheService: AuthCacheService,
    private readonly followRepository: FollowRepository,
  ) {}

  public async findAll(): Promise<any> {
    return `This action returns all users`;
  }

  public async findOne(userId: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found.`);
    }
    return user;
  }

  public async findMe(userData: IUserData): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: userData.userId });
  }

  public async updateMe(
    userData: IUserData,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  public async removeMe(userData: IUserData): Promise<any> {
    await this.userRepository.delete({ id: userData.userId });
    await this.authCacheService.deleteToken(userData.userId, userData.deviceId);
  }

  public async follow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You can not follow yourself!');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });

    if (follow) {
      throw new ConflictException('You already follow this user.');
    }

    await this.followRepository.save(
      this.followRepository.create({
        follower_id: userData.userId,
        following_id: userId,
      }),
    );
  }

  public async unfollow(userData: IUserData, userId: string): Promise<void> {
    if (userData.userId === userId) {
      throw new ConflictException('You can not follow yourself!');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const follow = await this.followRepository.findOneBy({
      follower_id: userData.userId,
      following_id: userId,
    });

    if (!follow) {
      throw new ConflictException('You do not follow this user.');
    }

    await this.followRepository.delete({ id: follow.id });
  }

  public async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new ConflictException('Email already exists');
    }
  }

  public async uploadAvatar(
    userData: IUserData,
    avatar: Express.Multer.File,
  ): Promise<void> {
    const image = await this.fileStorageService.uploadFile(
      avatar,
      ContentType.AVATAR,
      userData.userId,
    );

    await this.userRepository.update(userData.userId, { image });
  }

  public async deleteAvatar(userData: IUserData): Promise<void> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    await this.fileStorageService.deleteFile(user.image);
    await this.userRepository.update(userData.userId, { image: null });
  }
}
