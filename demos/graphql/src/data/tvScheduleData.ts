// TV Show data model and in-memory storage
import { TVShow as ITVShow, CreateTVShowInput, UpdateTVShowInput } from '../types';

export class TVShow implements ITVShow {
  public id: string;
  public title: string;
  public channel: string;
  public startTime: string; // ISO 8601 format
  public endTime: string;   // ISO 8601 format
  public description: string;
  public genre: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(
    id: string,
    title: string,
    channel: string,
    startTime: string,
    endTime: string,
    description: string,
    genre: string = "General"
  ) {
    this.id = id;
    this.title = title;
    this.channel = channel;
    this.startTime = startTime;
    this.endTime = endTime;
    this.description = description;
    this.genre = genre;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

// In-memory storage for TV shows
let tvShows: TVShow[] = [
  new TVShow(
    "1",
    "Morning News",
    "BBC One",
    "2024-01-15T06:00:00Z",
    "2024-01-15T07:00:00Z",
    "Daily news and current affairs",
    "News"
  ),
  new TVShow(
    "2",
    "Cooking Masters",
    "Channel 4",
    "2024-01-15T19:00:00Z",
    "2024-01-15T20:00:00Z",
    "Professional chefs compete in cooking challenges",
    "Reality"
  ),
  new TVShow(
    "3",
    "Science Documentary",
    "Discovery",
    "2024-01-15T21:00:00Z",
    "2024-01-15T22:30:00Z",
    "Exploring the mysteries of the universe",
    "Documentary"
  )
];

// Helper function to generate unique IDs
let nextId: number = 4;
function generateId(): string {
  return (nextId++).toString();
}

// Data access functions
export const tvScheduleData = {
  // Get all TV shows
  getAllShows: (): TVShow[] => {
    return [...tvShows]; // Return a copy to prevent direct mutation
  },

  // Get a TV show by ID
  getShowById: (id: string): TVShow | undefined => {
    return tvShows.find(show => show.id === id);
  },

  // Get shows by channel
  getShowsByChannel: (channel: string): TVShow[] => {
    return tvShows.filter(show => 
      show.channel.toLowerCase().includes(channel.toLowerCase())
    );
  },

  // Get shows by genre
  getShowsByGenre: (genre: string): TVShow[] => {
    return tvShows.filter(show => 
      show.genre.toLowerCase() === genre.toLowerCase()
    );
  },

  // Get all unique channels
  getChannels: (): string[] => {
    const channels = [...new Set(tvShows.map(show => show.channel))];
    return channels.sort();
  },

  // Get all unique genres
  getGenres: (): string[] => {
    const genres = [...new Set(tvShows.map(show => show.genre))];
    return genres.sort();
  },

  // Create a new TV show
  createShow: (input: CreateTVShowInput): TVShow => {
    const newShow = new TVShow(
      generateId(),
      input.title,
      input.channel,
      input.startTime,
      input.endTime,
      input.description,
      input.genre || "General"
    );
    tvShows.push(newShow);
    return newShow;
  },

  // Update an existing TV show
  updateShow: (id: string, input: UpdateTVShowInput): TVShow => {
    const showIndex = tvShows.findIndex(show => show.id === id);
    if (showIndex === -1) {
      throw new Error(`TV show with ID ${id} not found`);
    }

    const existingShow = tvShows[showIndex];
    const updatedShow = new TVShow(
      existingShow.id,
      input.title ?? existingShow.title,
      input.channel ?? existingShow.channel,
      input.startTime ?? existingShow.startTime,
      input.endTime ?? existingShow.endTime,
      input.description ?? existingShow.description,
      input.genre ?? existingShow.genre
    );
    
    updatedShow.createdAt = existingShow.createdAt; // Preserve creation date
    updatedShow.updatedAt = new Date().toISOString(); // Update the modification date

    tvShows[showIndex] = updatedShow;
    return updatedShow;
  },

  // Delete a TV show
  deleteShow: (id: string): TVShow => {
    const showIndex = tvShows.findIndex(show => show.id === id);
    if (showIndex === -1) {
      throw new Error(`TV show with ID ${id} not found`);
    }

    const deletedShow = tvShows[showIndex];
    tvShows.splice(showIndex, 1);
    return deletedShow;
  },

  // Get shows within a time range
  getShowsByTimeRange: (startTime: string, endTime: string): TVShow[] => {
    return tvShows.filter(show => {
      const showStart = new Date(show.startTime);
      const showEnd = new Date(show.endTime);
      const rangeStart = new Date(startTime);
      const rangeEnd = new Date(endTime);

      return (showStart >= rangeStart && showStart <= rangeEnd) ||
             (showEnd >= rangeStart && showEnd <= rangeEnd) ||
             (showStart <= rangeStart && showEnd >= rangeEnd);
    });
  },  // Clear all shows (useful for testing)
  clearAllShows: (): boolean => {
    tvShows = [];
    nextId = 1; // Reset to start from 1
    return true;
  },

  // Reset to initial data (useful for testing)
  resetToInitialData: (): boolean => {
    tvShows = [
      new TVShow(
        "1",
        "Morning News",
        "BBC One",
        "2024-01-15T06:00:00Z",
        "2024-01-15T07:00:00Z",
        "Daily news and current affairs",
        "News"
      ),
      new TVShow(
        "2",
        "Cooking Masters",
        "Channel 4",
        "2024-01-15T19:00:00Z",
        "2024-01-15T20:00:00Z",
        "Professional chefs compete in cooking challenges",
        "Reality"
      ),
      new TVShow(
        "3",
        "Science Documentary",
        "Discovery",
        "2024-01-15T21:00:00Z",
        "2024-01-15T22:30:00Z",
        "Exploring the mysteries of the universe",
        "Documentary"
      )
    ];
    nextId = 4;
    return true;
  }
};
