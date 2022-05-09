import { Game } from '../entity/Game';
import { Dictionary } from '../entity/Dictionary';
import { Card, CardType } from '../entity/Card';

export class GameService {
  async createGame(gameKey: string): Promise<Game> {
    const existingGame = await Game.findOne({
      where: { gameKey },
    });

    if (existingGame) {
      return existingGame;
    }

    const cards: Card[] = await this.createCards();

    const game = await Game.create({
      gameKey,
      cards,
      dateCreated: new Date(),
    }).save();

    return game;
  }

  private async createCards() {
    const DICTIONARY_NAME = 'RUSSIAN_BASIC';
    const LIST_SIZE = {
      CARDS: 25,
      RED_CARDS: 0,
      BLUE_CARDS: 0,
    };

    if (!Math.round(Math.random())) {
      LIST_SIZE.RED_CARDS = 9;
      LIST_SIZE.BLUE_CARDS = 8;
    } else {
      LIST_SIZE.RED_CARDS = 8;
      LIST_SIZE.BLUE_CARDS = 9;
    }

    const dictionary = await Dictionary.findOne({
      where: { name: DICTIONARY_NAME },
    });
    const allWords = dictionary!.words.split(',');

    const randomCardIndexes = this.getRandomIndexes(
      LIST_SIZE.CARDS,
      allWords.length,
    );
    const randomBlackCardIndex = this.getRandomIndexes(1, LIST_SIZE.CARDS)[0];
    const randomRedCardIndexes = this.getRandomIndexes(
      LIST_SIZE.RED_CARDS,
      LIST_SIZE.CARDS,
      [randomBlackCardIndex],
    );
    const randomBlueCardIndexes = this.getRandomIndexes(
      LIST_SIZE.BLUE_CARDS,
      LIST_SIZE.CARDS,
      [...randomRedCardIndexes, randomBlackCardIndex],
    );

    const cards: Card[] = [];
    for (let i = 0; i < randomCardIndexes.length; i++) {
      const randomIndex = randomCardIndexes[i];
      let cardType: CardType;
      if (randomRedCardIndexes.includes(i)) {
        cardType = CardType.RED;
      } else if (randomBlueCardIndexes.includes(i)) {
        cardType = CardType.BLUE;
      } else if (randomBlackCardIndex === i) {
        cardType = CardType.BLACK;
      } else {
        cardType = CardType.WHITE;
      }

      const card = Card.create({
        no: i,
        word: allWords[randomIndex],
        type: cardType,
        isOpen: false,
        isActive: true,
      });
      cards.push(card);
    }

    return cards;
  }

  private getRandomIndexes(
    numberOfIndexes: number,
    maxIndexNumber: number,
    excludeIndexes?: number[],
  ): number[] {
    const indexes = new Set();
    while (indexes.size !== numberOfIndexes) {
      const index = Math.floor(Math.random() * maxIndexNumber);
      if (excludeIndexes) {
        if (!excludeIndexes.includes(index)) {
          indexes.add(index);
        }
      } else {
        indexes.add(index);
      }
    }

    return Array.from(indexes) as number[];
  }
}
