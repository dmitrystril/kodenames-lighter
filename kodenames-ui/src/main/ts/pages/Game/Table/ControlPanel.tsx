import React from 'react';
import styled from 'styled-components';
import { CardType } from '../../../generated/graphql';
import { Card, Game } from '../../../types';

const Root = styled.div`
  display: flex;
  width: 100%;
  height: 150px;

  @media (max-width: 500px) {
    height: 90px;
  }
`;

const TeamScore = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  min-width: 33.33%;
  min-height: 100%;
  background-color: ${({ color }) => color};
  font-size: 84px;
  font-weight: 700;
  font-family: 'Roboto Condensed', sans-serif;
  color: #444;

  @media (max-width: 500px) {
    font-size: 52px;
  }
`;

const ToggleMenuButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 33.33%;
`;

interface ControlPanelProps {
  game: any;
}

export const ControlPanel = ({ game }: ControlPanelProps) => {
  const countRedCloseCards = game.cards.filter(
    (card: Card) => card.type === CardType.Red && card.isOpen === false,
  ).length;
  const countBlueCloseCards = game.cards.filter(
    (card: Card) => card.type === CardType.Blue && card.isOpen === false,
  ).length;

  return (
    <Root>
      <TeamScore color="#ff6450">{countRedCloseCards}</TeamScore>
      <ToggleMenuButtonWrapper>
        <button>Меню</button>
      </ToggleMenuButtonWrapper>
      <TeamScore color="#50bbff">{countBlueCloseCards}</TeamScore>
    </Root>
  );
};
