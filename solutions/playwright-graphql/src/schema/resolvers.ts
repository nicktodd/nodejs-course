import { GraphQLError } from 'graphql';
import { tvshows } from '../data/tvshows.data';
import { TVShow, CreateTVShowInput, UpdateTVShowInput } from './types';

export const resolvers = {
  Query: {
    tvshows: () => {
      return tvshows;
    },
    tvshow: (_: any, { id }: { id: string }) => {
      const show = tvshows.find(show => show.id === id);
      if (!show) {
        throw new GraphQLError(`TV show with ID ${id} not found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }
      return show;
    },
    tvshowsByGenre: (_: any, { genre }: { genre: string }) => {
      return tvshows.filter(show => show.genre === genre);
    },
    tvshowsByChannel: (_: any, { channel }: { channel: string }) => {
      return tvshows.filter(show => show.channel === channel);
    },
    genres: () => {
      const genres = new Set(tvshows.map(show => show.genre));
      return Array.from(genres);
    },
    channels: () => {
      const channels = new Set(tvshows.map(show => show.channel));
      return Array.from(channels);
    }
  },
  Mutation: {
    createTvShow: (_: any, { input }: { input: CreateTVShowInput }) => {
      // Validate input
      if (new Date(input.startTime) >= new Date(input.endTime)) {
        throw new GraphQLError('Start time must be before end time', {
          extensions: { code: 'BAD_USER_INPUT' }
        });
      }

      const now = new Date().toISOString();
      const newShow: TVShow = {
        id: String(tvshows.length + 1),
        ...input,
        createdAt: now,
        updatedAt: now
      };

      tvshows.push(newShow);
      return newShow;
    },
    updateTvShow: (_: any, { id, input }: { id: string, input: UpdateTVShowInput }) => {
      const index = tvshows.findIndex(show => show.id === id);
      
      if (index === -1) {
        throw new GraphQLError(`TV show with ID ${id} not found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      // Validate time range if both are provided
      if (input.startTime && input.endTime) {
        if (new Date(input.startTime) >= new Date(input.endTime)) {
          throw new GraphQLError('Start time must be before end time', {
            extensions: { code: 'BAD_USER_INPUT' }
          });
        }
      } else if (input.startTime && !input.endTime) {
        // If only start time is provided, validate against existing end time
        if (new Date(input.startTime) >= new Date(tvshows[index].endTime)) {
          throw new GraphQLError('Start time must be before end time', {
            extensions: { code: 'BAD_USER_INPUT' }
          });
        }
      } else if (!input.startTime && input.endTime) {
        // If only end time is provided, validate against existing start time
        if (new Date(tvshows[index].startTime) >= new Date(input.endTime)) {
          throw new GraphQLError('Start time must be before end time', {
            extensions: { code: 'BAD_USER_INPUT' }
          });
        }
      }

      const updatedShow: TVShow = {
        ...tvshows[index],
        ...input,
        updatedAt: new Date().toISOString()
      };

      tvshows[index] = updatedShow;
      return updatedShow;
    },
    deleteTvShow: (_: any, { id }: { id: string }) => {
      const index = tvshows.findIndex(show => show.id === id);
      
      if (index === -1) {
        throw new GraphQLError(`TV show with ID ${id} not found`, {
          extensions: { code: 'NOT_FOUND' }
        });
      }

      const deletedShow = tvshows[index];
      tvshows.splice(index, 1);
      
      return deletedShow;
    }
  }
};
