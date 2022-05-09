import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
   __typename?: 'Query';
  noop: Scalars['String'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createGame: Game;
  openCard: Scalars['Boolean'];
};


export type MutationCreateGameArgs = {
  gameKey: Scalars['String'];
};


export type MutationOpenCardArgs = {
  cardId: Scalars['String'];
};

export type Game = {
   __typename?: 'Game';
  id: Scalars['ID'];
  cards: Array<Card>;
  dateCreated: Scalars['DateTime'];
};

export type Card = {
   __typename?: 'Card';
  id: Scalars['ID'];
  no: Scalars['Int'];
  word: Scalars['String'];
  type: CardType;
  game: Game;
  isOpen: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
};

export enum CardType {
  Red = 'RED',
  Blue = 'BLUE',
  White = 'WHITE',
  Black = 'BLACK'
}


export type Subscription = {
   __typename?: 'Subscription';
  subscribeToGameChange: GameChangeNotification;
};

export type GameChangeNotification = {
   __typename?: 'GameChangeNotification';
  changeType: GameChangeType;
  change: GameChange;
};

export enum GameChangeType {
  CardOpen = 'CARD_OPEN',
  LogEntryAdd = 'LOG_ENTRY_ADD'
}

export type GameChange = CardOpen | LogEntryAdd;

export type CardOpen = {
   __typename?: 'CardOpen';
  cardId: Scalars['String'];
};

export type LogEntryAdd = {
   __typename?: 'LogEntryAdd';
  logEntry: Scalars['String'];
};

export type Dictionary = {
   __typename?: 'Dictionary';
  id: Scalars['ID'];
  name: Scalars['String'];
  description: Scalars['String'];
  words: Scalars['String'];
};

export type CreateGameMutationVariables = {
  gameKey: Scalars['String'];
};


export type CreateGameMutation = (
  { __typename?: 'Mutation' }
  & { createGame: (
    { __typename?: 'Game' }
    & Pick<Game, 'id' | 'dateCreated'>
    & { cards: Array<(
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'no' | 'word' | 'type' | 'isOpen' | 'isActive'>
    )> }
  ) }
);

export type OpenCardMutationVariables = {
  cardId: Scalars['String'];
};


export type OpenCardMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'openCard'>
);

export type SubscribeToGameChangeSubscriptionVariables = {};


export type SubscribeToGameChangeSubscription = (
  { __typename?: 'Subscription' }
  & { subscribeToGameChange: (
    { __typename?: 'GameChangeNotification' }
    & Pick<GameChangeNotification, 'changeType'>
    & { change: (
      { __typename: 'CardOpen' }
      & Pick<CardOpen, 'cardId'>
    ) | (
      { __typename: 'LogEntryAdd' }
      & Pick<LogEntryAdd, 'logEntry'>
    ) }
  ) }
);


export const CreateGameDocument = gql`
    mutation createGame($gameKey: String!) {
  createGame(gameKey: $gameKey) {
    id
    cards {
      id
      no
      word
      type
      isOpen
      isActive
    }
    dateCreated
  }
}
    `;
export type CreateGameMutationFn = ApolloReactCommon.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      gameKey: // value for 'gameKey'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, baseOptions);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = ApolloReactCommon.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const OpenCardDocument = gql`
    mutation openCard($cardId: String!) {
  openCard(cardId: $cardId)
}
    `;
export type OpenCardMutationFn = ApolloReactCommon.MutationFunction<OpenCardMutation, OpenCardMutationVariables>;

/**
 * __useOpenCardMutation__
 *
 * To run a mutation, you first call `useOpenCardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenCardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openCardMutation, { data, loading, error }] = useOpenCardMutation({
 *   variables: {
 *      cardId: // value for 'cardId'
 *   },
 * });
 */
export function useOpenCardMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OpenCardMutation, OpenCardMutationVariables>) {
        return ApolloReactHooks.useMutation<OpenCardMutation, OpenCardMutationVariables>(OpenCardDocument, baseOptions);
      }
export type OpenCardMutationHookResult = ReturnType<typeof useOpenCardMutation>;
export type OpenCardMutationResult = ApolloReactCommon.MutationResult<OpenCardMutation>;
export type OpenCardMutationOptions = ApolloReactCommon.BaseMutationOptions<OpenCardMutation, OpenCardMutationVariables>;
export const SubscribeToGameChangeDocument = gql`
    subscription subscribeToGameChange {
  subscribeToGameChange {
    changeType
    change {
      __typename
      ... on CardOpen {
        cardId
      }
      ... on LogEntryAdd {
        logEntry
      }
    }
  }
}
    `;

/**
 * __useSubscribeToGameChangeSubscription__
 *
 * To run a query within a React component, call `useSubscribeToGameChangeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToGameChangeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToGameChangeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToGameChangeSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubscribeToGameChangeSubscription, SubscribeToGameChangeSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubscribeToGameChangeSubscription, SubscribeToGameChangeSubscriptionVariables>(SubscribeToGameChangeDocument, baseOptions);
      }
export type SubscribeToGameChangeSubscriptionHookResult = ReturnType<typeof useSubscribeToGameChangeSubscription>;
export type SubscribeToGameChangeSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeToGameChangeSubscription>;