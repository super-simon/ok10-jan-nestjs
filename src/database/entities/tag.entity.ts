import { Column, Entity, ManyToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateUpdateModel } from './models/create-update.model';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];
}
