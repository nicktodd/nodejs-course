import { tvScheduleData } from '../data/tvScheduleData';
import { 
  TVShow, 
  CreateTVShowInput, 
  UpdateTVShowInput, 
  GraphQLContext, 
  QueryArgs, 
  MutationArgs,
  SUBSCRIPTION_EVENTS 
} from '../types';

// Simple event emitter for subscriptions (placeholder)
class SimplePubSub {
  private subscribers: Map<string, any>;

  constructor() {
    this.subscribers = new Map();
  }
  
  publish(event: string, payload: any): void {
    // Simple placeholder - in production use proper PubSub
    console.log(`Event published: ${event}`, payload);
  }
    asyncIterator(events: string[]): any {
    // Placeholder for subscription iterator
    return {
      [Symbol.asyncIterator]: async function* () {
        // Simple placeholder implementation
        yield null;
      }
    };
  }
}

// Create a simple PubSub instance for subscriptions
const pubsub = new SimplePubSub();

// GraphQL resolvers
export const resolvers = {
  Query: {
    // Get all TV shows
    shows: (): TVShow[] => {
      try {
        return tvScheduleData.getAllShows();
      } catch (error) {
        throw new Error(`Failed to fetch shows: ${(error as Error).message}`);
      }
    },

    // Get a specific TV show by ID
    show: (parent: any, { id }: QueryArgs): TVShow | null => {
      try {
        const show = tvScheduleData.getShowById(id!);
        if (!show) {
          throw new Error(`TV show with ID ${id} not found`);
        }
        return show;
      } catch (error) {
        throw new Error(`Failed to fetch show: ${(error as Error).message}`);
      }
    },

    // Get shows by channel
    showsByChannel: (parent: any, { channel }: QueryArgs): TVShow[] => {
      try {
        return tvScheduleData.getShowsByChannel(channel!);
      } catch (error) {
        throw new Error(`Failed to fetch shows by channel: ${(error as Error).message}`);
      }
    },

    // Get shows by genre
    showsByGenre: (parent: any, { genre }: QueryArgs): TVShow[] => {
      try {
        return tvScheduleData.getShowsByGenre(genre!);
      } catch (error) {
        throw new Error(`Failed to fetch shows by genre: ${(error as Error).message}`);
      }
    },

    // Get shows within a time range
    showsByTimeRange: (parent: any, { startTime, endTime }: QueryArgs): TVShow[] => {
      try {
        // Validate the time format
        if (!Date.parse(startTime!) || !Date.parse(endTime!)) {
          throw new Error('Invalid date format. Please use ISO 8601 format.');
        }
        
        return tvScheduleData.getShowsByTimeRange(startTime!, endTime!);
      } catch (error) {
        throw new Error(`Failed to fetch shows by time range: ${(error as Error).message}`);
      }
    },

    // Get all available channels
    channels: (): string[] => {
      try {
        return tvScheduleData.getChannels();
      } catch (error) {
        throw new Error(`Failed to fetch channels: ${(error as Error).message}`);
      }
    },

    // Get all available genres
    genres: (): string[] => {
      try {
        return tvScheduleData.getGenres();
      } catch (error) {
        throw new Error(`Failed to fetch genres: ${(error as Error).message}`);
      }
    }
  },

  Mutation: {
    // Create a new TV show
    createShow: (parent: any, { input }: { input: CreateTVShowInput }): TVShow => {
      try {
        // Validate required fields
        if (!input.title || !input.channel || !input.startTime || !input.endTime || !input.description) {
          throw new Error('Missing required fields');
        }

        // Validate time format
        if (!Date.parse(input.startTime) || !Date.parse(input.endTime)) {
          throw new Error('Invalid date format. Please use ISO 8601 format.');
        }

        // Validate that start time is before end time
        if (new Date(input.startTime) >= new Date(input.endTime)) {
          throw new Error('Start time must be before end time');
        }

        const newShow = tvScheduleData.createShow(input);
        
        // Publish subscription event
        pubsub.publish(SUBSCRIPTION_EVENTS.SHOW_CREATED, { showCreated: newShow });
        
        return newShow;
      } catch (error) {
        throw new Error(`Failed to create show: ${(error as Error).message}`);
      }
    },

    // Update an existing TV show
    updateShow: (parent: any, { id, input }: { id: string; input: UpdateTVShowInput }): TVShow => {
      try {
        // Validate that the show exists
        const existingShow = tvScheduleData.getShowById(id);
        if (!existingShow) {
          throw new Error(`TV show with ID ${id} not found`);
        }

        // Validate time format if times are being updated
        if (input.startTime && !Date.parse(input.startTime)) {
          throw new Error('Invalid start time format. Please use ISO 8601 format.');
        }
        if (input.endTime && !Date.parse(input.endTime)) {
          throw new Error('Invalid end time format. Please use ISO 8601 format.');
        }

        // Validate that start time is before end time if both are provided
        const finalStartTime = input.startTime || existingShow.startTime;
        const finalEndTime = input.endTime || existingShow.endTime;
        if (new Date(finalStartTime) >= new Date(finalEndTime)) {
          throw new Error('Start time must be before end time');
        }

        const updatedShow = tvScheduleData.updateShow(id, input);
        
        // Publish subscription event
        pubsub.publish(SUBSCRIPTION_EVENTS.SHOW_UPDATED, { showUpdated: updatedShow });
        
        return updatedShow;
      } catch (error) {
        throw new Error(`Failed to update show: ${(error as Error).message}`);
      }
    },

    // Delete a TV show
    deleteShow: (parent: any, { id }: { id: string }): TVShow => {
      try {
        const deletedShow = tvScheduleData.deleteShow(id);
        
        // Publish subscription event
        pubsub.publish(SUBSCRIPTION_EVENTS.SHOW_DELETED, { showDeleted: deletedShow });
        
        return deletedShow;
      } catch (error) {
        throw new Error(`Failed to delete show: ${(error as Error).message}`);
      }
    },

    // Clear all shows (for testing purposes)
    clearAllShows: (): boolean => {
      try {
        return tvScheduleData.clearAllShows();
      } catch (error) {
        throw new Error(`Failed to clear shows: ${(error as Error).message}`);
      }
    },

    // Reset to initial data (for testing purposes)
    resetToInitialData: (): boolean => {
      try {
        return tvScheduleData.resetToInitialData();
      } catch (error) {
        throw new Error(`Failed to reset data: ${(error as Error).message}`);
      }
    }
  },

  Subscription: {
    // Subscribe to show updates
    showUpdated: {
      subscribe: () => pubsub.asyncIterator([SUBSCRIPTION_EVENTS.SHOW_UPDATED])
    },

    // Subscribe to new shows
    showCreated: {
      subscribe: () => pubsub.asyncIterator([SUBSCRIPTION_EVENTS.SHOW_CREATED])
    },    // Subscribe to deleted shows
    showDeleted: {
      subscribe: () => pubsub.asyncIterator([SUBSCRIPTION_EVENTS.SHOW_DELETED])
    }
  }
};
