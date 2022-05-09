import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { getRandomKey } from '../../../resources/syllables';
import { ScreenEnum, Settings } from './Settings';
import { Table } from './Table';

import {
  useSubscribeToGameChangeSubscription,
  GameChangeType,
  CardOpen,
  useCreateGameMutation,
  Game as GameType,
} from '../../generated/graphql';
import { Player, Team } from '../../types';

const Root = styled.div`
  height: 100%;
`;

export enum TableModeEnum {
  Common = 'Common',
  Captain = 'Captain',
}

export const GameContainer = () => {
  const history = useHistory();

  const [screen, setScreen] = useState(ScreenEnum.Settings);
  const [gameKey, setGameKey] = useState<string>('');
  const [players, setPlayers] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [tableMode, setTableMode] = useState<TableModeEnum>(
    TableModeEnum.Common,
  );
  const [
    createGameMutation,
    { data, loading, error },
  ] = useCreateGameMutation();
  const [gameState, setGameState] = useState<GameType>();

  const initGame = async () => {
    const game = await createGameMutation({
      variables: { gameKey: gameKey },
    }).catch((error) => {
      console.error('game not created', error);
    });

    if (game) {
      setGameState(game.data?.createGame as GameType);
    }
  };

  const initTeams = () => {
    let result: Player[] = players
      .split(/\r?\n/)
      .filter((item) => item.trim() !== '');
    console.log('result: ' + result);
    if (result.length < 2) {
      setTeams([]);
    }

    const shuffledPlayers = result.sort(() => Math.random() - 0.5);
    const redCaptain: Player = shuffledPlayers[0];
    const blueCaptain: Player = shuffledPlayers[1];

    const middleIndex = Math.ceil((shuffledPlayers.length + 2) / 2);
    const redTeam = shuffledPlayers.slice(2, middleIndex);
    const blueTeam = shuffledPlayers.slice(middleIndex);

    const teams: Team[] = [
      { captain: redCaptain, players: redTeam },
      { captain: blueCaptain, players: blueTeam },
    ];

    setTeams(teams);
  };

  useEffect(() => {
    initTeams();
  }, [players]);

  const initPlayers = () => {
    const players = localStorage.getItem('players') || '';
    setPlayers(players);
  };

  const initGameKey = () => {
    const key = getRandomKey();
    setGameKey(key);
    initTeams();
    history.push(`/${key}`);
  };

  const init = async () => {
    const keyFromUrl = decodeURI(window.location.pathname).substring(1);
    if (keyFromUrl.length) {
      setGameKey(keyFromUrl);
    } else {
      initGameKey();
    }

    initPlayers();
  };

  const handleOpenCommonTable = () => {
    initGame();

    setScreen(ScreenEnum.Table);
    setTableMode(TableModeEnum.Common);
  };

  const handleOpenCaptainTable = () => {
    initGame();

    setScreen(ScreenEnum.Table);
    setTableMode(TableModeEnum.Captain);
  };

  useEffect(() => {
    init();
  }, []);

  useSubscribeToGameChangeSubscription({
    onSubscriptionData: (options) => {
      const {
        change,
        changeType,
      } = options.subscriptionData.data!.subscribeToGameChange;

      switch (changeType) {
        case GameChangeType.CardOpen: {
          const newgameState = { ...gameState } as GameType;
          const cardOpen = change as CardOpen;
          console.log('change: ' + cardOpen.cardId);
          const cards = newgameState.cards;
          console.log(cards);
          if (cards) {
            for (let i = 0; i < cards.length; i++) {
              if (cards[i].id === cardOpen.cardId) {
                cards[i].isOpen = true;
              }
            }
          }
          setGameState(newgameState);

          break;
        }
        default:
          console.log('Game changed somehow ¯\\_(ツ)_/¯');
      }
    },
  });

  const handleSetPlayers = (value: string) => {
    setPlayers(value);
    localStorage.setItem('players', value);
    initTeams();
  };

  // if (!gameState) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Root>
      {screen === ScreenEnum.Settings && (
        <Settings
          gameKey={gameKey}
          setGameKey={setGameKey}
          handleGenerateKey={initGameKey}
          players={players}
          teams={teams}
          handleSetPlayers={handleSetPlayers}
          handleOpenCommonTable={handleOpenCommonTable}
          handleOpenCaptainTable={handleOpenCaptainTable}
        />
      )}
      {screen === ScreenEnum.Table && gameState && (
        <Table game={gameState} tableMode={tableMode} />
      )}
    </Root>
  );
};
