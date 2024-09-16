import { Injectable } from '@nestjs/common';
import { TagEntity } from 'src/database/entities/tag.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }

  public async getPopular(): Promise<TagEntity[]> {
    const qb = this.createQueryBuilder('tag')
      .leftJoin('tag.articles', 'article')
      .addSelect('COUNT(article.id)', 'tag_articleCount')
      .groupBy('tag.id')
      .orderBy('"tag_articleCount"', 'DESC')
      .limit(10);
    return await qb.getMany();
  }
}
