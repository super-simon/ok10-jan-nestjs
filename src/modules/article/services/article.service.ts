import { Injectable } from '@nestjs/common';
import { TagEntity } from 'src/database/entities/tag.entity';
import { In } from 'typeorm';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { ArticleRepository } from '../../repository/services/article.repository';
import { TagRepository } from '../../repository/services/tag.repository';
import { CreateArticleDto } from '../dto/req/create-article.req.dto';
import { UpdateArticleDto } from '../dto/req/update-article.req.dto';
import { ArticleResDto } from '../dto/res/article.res.dto';
import { ArticleMapper } from './article.mapper';

@Injectable()
export class ArticleService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}
  public async create(
    userData: IUserData,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleResDto> {
    const tags = await this.createTags(createArticleDto.tags);
    const result = await this.articleRepository.save(
      this.articleRepository.create({
        ...createArticleDto,
        user_id: userData.userId,
        tags,
      }),
    );
    return ArticleMapper.toResponseDTO(result);
  }

  public async update(
    userData: IUserData,
    articleId: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<string> {
    console.log(updateArticleDto);
    return `This action updates a #${articleId} article`;
  }

  private async createTags(tags: string[]): Promise<TagEntity[]> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.tagRepository.findBy({ name: In(tags) });
    const existingTags = entities.map((entity) => entity.name);
    const newTags = tags.filter((tag) => !existingTags.includes(tag));
    const newEntities = await this.tagRepository.save(
      newTags.map((tag) => this.tagRepository.create({ name: tag })),
    );
    return [...entities, ...newEntities];
  }
}
