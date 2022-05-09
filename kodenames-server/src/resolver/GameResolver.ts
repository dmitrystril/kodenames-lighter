import {
  Resolver,
  Mutation,
  Arg,
  Subscription,
  Root,
  PubSub,
  Publisher,
  Query,
} from 'type-graphql';

import { GameService } from '../service/GameService';
import { Card } from '../entity/Card';
import {
  GameChangeNotification,
  GameChangeType,
} from '../entity/notification/GameChangeNotification';
import { CardOpen } from '../entity/notification/CardOpen';
import { Game } from '../entity/Game';
const GAME_CHANGE_SUBSCRIPTION = 'GAME_CHANGE_SUBSCRIPTION';

@Resolver()
export class GameResolver {
  private gameService: GameService;

  constructor() {
    this.gameService = new GameService();
  }

  @Mutation(() => Game)
  createGame(@Arg('gameKey') gameKey: string) {
    return this.gameService.createGame(gameKey);
  }

  @Query(() => String)
  noop() {
    return '';
  }

  @Mutation(() => Boolean)
  async openCard(
    @Arg('cardId') cardId: string,
    @PubSub(GAME_CHANGE_SUBSCRIPTION)
    publish: Publisher<GameChangeNotification>,
  ) {
    const card = await Card.findOne({
      where: { id: cardId },
    });

    if (card!.isOpen) {
      return false;
    }

    card!.isOpen = true;
    card!.save();

    let cardOpen = new CardOpen();
    cardOpen.cardId = card!.id;
    await publish({
      changeType: GameChangeType.CARD_OPEN,
      change: cardOpen,
    });
    return true;
  }

  @Subscription({
    topics: GAME_CHANGE_SUBSCRIPTION,
    // filter: ({ payload, args }) => {args.gameKey.includes(payload.gameKey)},
  })
  subscribeToGameChange(
    @Root() gameChangeNotification: GameChangeNotification,
  ): GameChangeNotification {
    return gameChangeNotification;
  }
}
