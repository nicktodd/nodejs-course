// TypeScript interfaces for TV Schedule GraphQL API

export interface TVShow {
  id: string;
  title: string;
  channel: string;
  startTime: string; // ISO 8601 format
  endTime: string;   // ISO 8601 format
  description: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTVShowInput {
  title: string;
  channel: string;
  startTime: string;
  endTime: string;
  description: string;
  genre?: string;
}

export interface UpdateTVShowInput {
  title?: string;
  channel?: string;
  startTime?: string;
  endTime?: string;
  description?: string;
  genre?: string;
}

export interface GraphQLContext {
  req: any;
  res: any;
}

export interface QueryArgs {
  id?: string;
  channel?: string;
  genre?: string;
  startTime?: string;
  endTime?: string;
}

export interface MutationArgs {
  id?: string;
  input?: CreateTVShowInput | UpdateTVShowInput;
}

// Subscription event types
export const SUBSCRIPTION_EVENTS = {
  SHOW_CREATED: 'SHOW_CREATED',
  SHOW_UPDATED: 'SHOW_UPDATED',
  SHOW_DELETED: 'SHOW_DELETED'
} as const;

export type SubscriptionEvent = typeof SUBSCRIPTION_EVENTS[keyof typeof SUBSCRIPTION_EVENTS];
