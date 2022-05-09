import React from 'react';
import styled from 'styled-components';

import { Team } from '../../types';

const Root = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 0;
  margin-bottom: 12px;

  @media (max-width: 850px) {
    flex-direction: column;
  }
`;

const TeamTitle = styled.h2`
  font-weight: 700;
  text-align: center;
  margin: 0;
  font-size: 3vmin;
`;

const TeamRed = styled.div`
  display: flex;
  flex-direction: column;
  background: #ff6450;
  color: #8a1000;
  width: 50%;
  padding: 15px 0;

  @media (max-width: 850px) {
    width: 100%;
  }
`;

const TeamBlue = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 35px;
  padding: 15px 0;
  background: #50bbff;
  color: #00548a;
  width: 50%;

  @media (max-width: 850px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const Teammates = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2vmin 2vmin 0;
`;

const Teammate = styled.div`
  display: inline-block;
  margin-right: 1vmin;
  background: rgba(255, 255, 255, 0.9);
  color: #444;
  padding: 1.5vmin 2vmin;
  border-radius: 0.5vmin;
  font-size: 2.5vmin;
  margin-top: 1vmin;
  font-weight: 700;
`;

const CaptainLabel = styled.span`
  font-weight: 400;
`;

type TeamPanelProps = {
  teams: Team[];
};

const TeamPanel = ({ teams }: TeamPanelProps) => {
  return (
    <Root>
      <TeamRed>
        <TeamTitle>Команда красных</TeamTitle>
        <Teammates>
          <Teammate>
            <CaptainLabel>Капитан: </CaptainLabel>
            {teams[0] && teams[0].captain}
          </Teammate>
          {teams.length &&
            teams[0].players.map((mate) => <Teammate>{mate}</Teammate>)}
        </Teammates>
      </TeamRed>
      <TeamBlue>
        <TeamTitle>Команда синих</TeamTitle>
        <Teammates>
          <Teammate>
            <CaptainLabel>Капитан: </CaptainLabel>
            {teams[0] && teams[1].captain}
          </Teammate>
          {teams.length &&
            teams[1].players.map((mate) => <Teammate>{mate}</Teammate>)}
        </Teammates>
      </TeamBlue>
    </Root>
  );
};

export default TeamPanel;
