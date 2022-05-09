import React from 'react';
import styled from 'styled-components';
import { Team } from '../../../types';
import TeamPanel from '../TeamPanel';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  padding-bottom: 0;
  height: 100%;
`;

const ColumnWrapper = styled.div`
  display: flex;
  height: 100%;

  > * + * {
    margin-left: 3rem; /* 16px */
  }

  @media (max-width: 850px) {
    flex-direction: column;
    > * + * {
      margin-left: 0;
    }
    height: auto;
  }
`;

const LeftColumn = styled.div`
  width: 40%;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const RightColumn = styled.div`
  width: 60%;

  @media (max-width: 850px) {
    width: 100%;
    margin-top: 24px;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 16px;
`;

const KeyDescription = styled.div``;

const KeyInput = styled.input`
  width: 100%;
  font-size: 64px;
  height: 90px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 5px;
  min-height: 40px;
  font-size: 16px;
  border-radius: 5px;
  background-image: linear-gradient(to bottom, #fff, #eee);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 0 #fff;
`;

const Text = styled.div`
  font-size: 16px;
  margin: 16px 0 10px 0;
`;

const Spacer = styled.div`
  min-height: 40px;
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  font-size: 16px;
`;

export enum ScreenEnum {
  Settings = 'Settings',
  Table = 'Table',
}

interface SettingsProps {
  gameKey: string;
  setGameKey: (value: string) => void;
  handleGenerateKey: () => void;
  players: string;
  teams: Team[];
  handleSetPlayers: (value: string) => void;
  handleOpenCommonTable: () => void;
  handleOpenCaptainTable: () => void;
}

export const Settings = ({
  gameKey,
  setGameKey,
  handleGenerateKey,
  players,
  teams,
  handleSetPlayers,
  handleOpenCommonTable,
  handleOpenCaptainTable,
}: SettingsProps) => {
  return (
    <Root>
      <ColumnWrapper>
        <LeftColumn>
          <Title>Ключ игры</Title>
          <KeyInput
            value={gameKey}
            onChange={(e) => setGameKey(e.target.value)}
          ></KeyInput>
          <Text>
            Ключ определяет раскладку игры и разбивку игроков на команды.
          </Text>
          <Button onClick={handleGenerateKey}>Сгенерировать другой ключ</Button>

          <Spacer />

          <Text>
            Капитаны команд заходят на эту страницу со своих устройств, вводях
            ключ и нажимают кнопку.
          </Text>
          <Button onClick={handleOpenCaptainTable}>К таблице капитанов</Button>

          <Text>Остальные открывают общее поле.</Text>
          <Button onClick={handleOpenCommonTable}>
            К общему игровому полю
          </Button>
        </LeftColumn>

        <RightColumn>
          <Title>Список игроков</Title>
          <TextArea
            rows={12}
            value={players}
            onChange={(event) => handleSetPlayers(event.target.value)}
          ></TextArea>
          <Text>
            Опциональное поле - помогает разбить игроков на команды случайным
            образом. Разбивка меняется со сменой ключа игры. По одному имени на
            строку.
          </Text>
        </RightColumn>
      </ColumnWrapper>

      <TeamPanel teams={teams} />
    </Root>
  );
};
