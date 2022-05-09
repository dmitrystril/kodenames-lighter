import React from 'react';
import styled from 'styled-components';

import { Card } from './Card';
import { useOpenCardMutation } from '../../../generated/graphql';
import { ControlPanel } from './ControlPanel';
import { TableModeEnum } from '..';

const RootRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  @media (orientation: portrait) {
    transform: rotate(90deg);
    transform-origin: top left;
    width: 100vh;
    height: 100vw;
    left: 100vw;
  }
`;

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const CardLayout = styled.div`
  background-color: white;
  padding: 10px;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-auto-flow: row;
  grid-template-areas:
    '. . . . .'
    '. . . . .'
    '. . . . .'
    '. . . . .'
    '. . . . .';
`;

interface TableProps {
  game: any;
  tableMode: TableModeEnum;
}

export const Table = ({ game, tableMode }: TableProps) => {
  const [openCard] = useOpenCardMutation();

  const handleOpenCard = async (cardId: string) => {
    if (tableMode !== TableModeEnum.Common) {
      return;
    }

    await openCard({
      variables: {
        cardId,
      },
    });
  };

  game.cards = game.cards.sort((card1: any, card2: any) => card1.no - card2.no);

  const isCommonTableMode = tableMode === TableModeEnum.Common;

  return (
    <RootRoot>
      <Root>
        <CardLayout>
          {game.cards.map((card: any, index: number) => (
            <Card
              card={card}
              key={index}
              onOpenCard={handleOpenCard}
              alwaysOpen={!isCommonTableMode}
            />
          ))}
        </CardLayout>

        <ControlPanel game={game} />
      </Root>
    </RootRoot>
  );
};
