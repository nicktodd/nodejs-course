export interface TVShow {
  id: string;
  title: string;
  channel: string;
  genre: string;
  description: string;
  startTime: string; // ISO 8601 format
  endTime: string; // ISO 8601 format
  createdAt: string;
  updatedAt: string;
}

export interface CreateTVShowInput {
  title: string;
  channel: string;
  genre: string;
  description: string;
  startTime: string;
  endTime: string;
}

export interface UpdateTVShowInput {
  title?: string;
  channel?: string;
  genre?: string;
  description?: string;
  startTime?: string;
  endTime?: string;
}
