import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CreateUpdateModel } from './models/create-update.model';
import { UserEntity } from './user.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.FOLLOWS)
export class FollowEntity extends CreateUpdateModel {
  @Column()
  follower_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'follower_id' })
  followers?: UserEntity;

  @Column()
  following_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'following_id' })
  followings?: UserEntity;
}
