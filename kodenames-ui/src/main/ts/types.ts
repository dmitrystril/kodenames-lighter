import { CardType } from './generated/graphql';

type Game = {
  id: string;
  cards: Array<Card>;
  dateCreated: Date;
};

type Card = {
  id: string;
  type: CardType;
  word: string;
  isOpen: boolean;
  isActive: boolean;
};

type Player = string;

type Team = {
  captain: Player;
  players: Player[];
};

export type { Game, Card, Player, Team };
