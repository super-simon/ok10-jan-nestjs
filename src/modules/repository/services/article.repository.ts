import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ArticleListQueryDto } from 'src/modules/article/dto/req/article-list.query.dto';
import { ArticleEntity } from '../../../database/entities/article.entity';

@Injectable()
export class ArticleRepository extends Repository<ArticleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ArticleEntity, dataSource.manager);
  }

  public async getList(
    userId: string,
    query: ArticleListQueryDto,
  ): Promise<[ArticleEntity[], number]> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');

    if (query.search) {
      qb.andWhere('CONCAT(article.title, article.description) ILIKE :search', {
        search: `%${query.search}%`,
      });
    }

    if (query.tag) {
      qb.andWhere('tag.name = :tag');
      qb.setParameter('tag', query.tag);
    }

    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );

    qb.setParameter('userId', userId);

    qb.take(query.limit);
    qb.skip(query.offset);
    return await qb.getManyAndCount();
  }

  public async getById(
    userId: string,
    articleId: string,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :userId');

    qb.andWhere('article.id = :articleId', { articleId });

    qb.leftJoinAndSelect(
      'user.followings',
      'following',
      'following.follower_id = :userId',
    );

    qb.setParameter('userId', userId);

    return await qb.getOneOrFail();
  }
}
