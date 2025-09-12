const { tvScheduleData } = require('../data/tvScheduleData');

// Simple event emitter for subscriptions (placeholder)
class SimplePubSub {
  constructor() {
    this.subscribers = new Map();
  }
  
  publish(event, payload) {
    // Simple placeholder - in production use proper PubSub
    console.log(`Event published: ${event}`, payload);
  }
  
  asyncIterator(events) {
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

// Subscription event names
const SHOW_CREATED = 'SHOW_CREATED';
const SHOW_UPDATED = 'SHOW_UPDATED';
const SHOW_DELETED = 'SHOW_DELETED';

// GraphQL resolvers
const resolvers = {
  Query: {
    // Get all TV shows
    shows: () => {
      try {
        return tvScheduleData.getAllShows();
      } catch (error) {
        throw new Error(`Failed to fetch shows: ${error.message}`);
      }
    },

    // Get a specific TV show by ID
    show: (parent, { id }) => {
      try {
        const show = tvScheduleData.getShowById(id);
        if (!show) {
          throw new Error(`TV show with ID ${id} not found`);
        }
        return show;
      } catch (error) {
        throw new Error(`Failed to fetch show: ${error.message}`);
      }
    },

    // Get shows by channel
    showsByChannel: (parent, { channel }) => {
      try {
        return tvScheduleData.getShowsByChannel(channel);
      } catch (error) {
        throw new Error(`Failed to fetch shows by channel: ${error.message}`);
      }
    },

    // Get shows by genre
    showsByGenre: (parent, { genre }) => {
      try {
        return tvScheduleData.getShowsByGenre(genre);
      } catch (error) {
        throw new Error(`Failed to fetch shows by genre: ${error.message}`);
      }
    },

    // Get shows within a time range
    showsByTimeRange: (parent, { startTime, endTime }) => {
      try {
        // Validate the time format
        if (!Date.parse(startTime) || !Date.parse(endTime)) {
          throw new Error('Invalid date format. Please use ISO 8601 format.');
        }
        
        return tvScheduleData.getShowsByTimeRange(startTime, endTime);
      } catch (error) {
        throw new Error(`Failed to fetch shows by time range: ${error.message}`);
      }
    },

    // Get all available channels
    channels: () => {
      try {
        const shows = tvScheduleData.getAllShows();
        const uniqueChannels = [...new Set(shows.map(show => show.channel))];
        return uniqueChannels.sort();
      } catch (error) {
        throw new Error(`Failed to fetch channels: ${error.message}`);
      }
    },

    // Get all available genres
    genres: () => {
      try {
        const shows = tvScheduleData.getAllShows();
        const uniqueGenres = [...new Set(shows.map(show => show.genre))];
        return uniqueGenres.sort();
      } catch (error) {
        throw new Error(`Failed to fetch genres: ${error.message}`);
      }
    }
  },

  Mutation: {
    // Create a new TV show
    createShow: (parent, { input }) => {
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
        pubsub.publish(SHOW_CREATED, { showCreated: newShow });
        
        return newShow;
      } catch (error) {
        throw new Error(`Failed to create show: ${error.message}`);
      }
    },

    // Update an existing TV show
    updateShow: (parent, { id, input }) => {
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
        pubsub.publish(SHOW_UPDATED, { showUpdated: updatedShow });
        
        return updatedShow;
      } catch (error) {
        throw new Error(`Failed to update show: ${error.message}`);
      }
    },

    // Delete a TV show
    deleteShow: (parent, { id }) => {
      try {
        const deletedShow = tvScheduleData.deleteShow(id);
        
        // Publish subscription event
        pubsub.publish(SHOW_DELETED, { showDeleted: deletedShow });
        
        return deletedShow;
      } catch (error) {
        throw new Error(`Failed to delete show: ${error.message}`);
      }
    },

    // Clear all shows (for testing purposes)
    clearAllShows: () => {
      try {
        tvScheduleData.clearAllShows();
        return true;
      } catch (error) {
        throw new Error(`Failed to clear shows: ${error.message}`);
      }
    },

    // Reset to initial data (for testing purposes)
    resetToInitialData: () => {
      try {
        tvScheduleData.resetToInitialData();
        return true;
      } catch (error) {
        throw new Error(`Failed to reset data: ${error.message}`);
      }
    }
  },

  Subscription: {
    // Subscribe to show updates
    showUpdated: {
      subscribe: () => pubsub.asyncIterator([SHOW_UPDATED])
    },

    // Subscribe to new shows
    showCreated: {
      subscribe: () => pubsub.asyncIterator([SHOW_CREATED])
    },

    // Subscribe to deleted shows
    showDeleted: {
      subscribe: () => pubsub.asyncIterator([SHOW_DELETED])
    }
  }
};

module.exports = resolvers;