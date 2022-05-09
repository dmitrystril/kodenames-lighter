import { ObjectType, Field, ID } from 'type-graphql';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
} from 'typeorm';

import { Card } from './Card';

@ObjectType()
@Entity('games')
export class Game extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String)
  @Column()
  gameKey: string;

  @Field(() => [Card])
  @OneToMany(() => Card, (card) => card.game, { cascade: true, eager: true })
  cards: Card[];

  @Field(() => Date)
  @Column()
  dateCreated: Date;
}
