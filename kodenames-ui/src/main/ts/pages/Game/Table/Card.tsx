import React from 'react';
import styled from 'styled-components';

import { CardType } from '../../../generated/graphql';

const Root = styled.div<{
  type: CardType;
  isOpen: boolean;
  alwaysOpen: boolean;
}>`
  border-radius: 5px;
  margin: 12px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ type, isOpen, alwaysOpen }) =>
    isOpen || alwaysOpen ? handleColorType(type) : '#fafafa'};
  user-select: none;
  opacity: ${({ alwaysOpen }) => (alwaysOpen ? 'auto' : 'pointer')};
  transition: transform 0.2s;
  font-size: 4vmin;
  font-weight: 700;
  text-transform: uppercase;
  opacity: ${({ isOpen }) => (isOpen ? 0.3 : 1)};
  color: #444;
  letter-spacing: 0.5px;
  padding: 4px 12px;

  @media (max-width: 767px) {
    margin: 4px;
  }
`;

const handleColorType = (type: CardType) => {
  switch (type) {
    case CardType.Red:
      return '#ff6450';
    case CardType.Blue:
      return '#50bbff';
    case CardType.White:
      return '#fafafa';
    case CardType.Black:
      return '#000000';
  }
};

interface CardProps {
  card: any;
  onOpenCard: Function;
  alwaysOpen: boolean;
}

export const Card = ({ card, onOpenCard, alwaysOpen = false }: CardProps) => {
  return (
    <Root
      type={card.type}
      isOpen={card.isOpen}
      alwaysOpen={alwaysOpen}
      onDoubleClick={() => onOpenCard(card.id)}
    >
      {card.word}
    </Root>
  );
};
