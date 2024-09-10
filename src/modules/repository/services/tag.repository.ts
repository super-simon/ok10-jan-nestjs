import { Injectable } from '@nestjs/common';
import { TagEntity } from 'src/database/entities/tag.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }
}
