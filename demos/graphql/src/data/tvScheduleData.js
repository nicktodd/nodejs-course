// TV Show data model and in-memory storage

class TVShow {
  constructor(id, title, channel, startTime, endTime, description, genre = "General") {
    this.id = id;
    this.title = title;
    this.channel = channel;
    this.startTime = startTime; // ISO 8601 format
    this.endTime = endTime;     // ISO 8601 format
    this.description = description;
    this.genre = genre;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

// In-memory storage for TV shows
let tvShows = [
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
let nextId = 4;
function generateId() {
  return (nextId++).toString();
}

// Data access functions
const tvScheduleData = {
  // Get all TV shows
  getAllShows: () => {
    return [...tvShows]; // Return a copy to prevent direct mutation
  },

  // Get a TV show by ID
  getShowById: (id) => {
    return tvShows.find(show => show.id === id);
  },

  // Get shows by channel
  getShowsByChannel: (channel) => {
    return tvShows.filter(show => 
      show.channel.toLowerCase().includes(channel.toLowerCase())
    );
  },

  // Get shows by genre
  getShowsByGenre: (genre) => {
    return tvShows.filter(show => 
      show.genre.toLowerCase() === genre.toLowerCase()
    );
  },

  // Create a new TV show
  createShow: (input) => {
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
  updateShow: (id, input) => {
    const showIndex = tvShows.findIndex(show => show.id === id);
    if (showIndex === -1) {
      throw new Error(`TV show with ID ${id} not found`);
    }

    const existingShow = tvShows[showIndex];
    const updatedShow = {
      ...existingShow,
      ...input,
      id: existingShow.id, // Ensure ID cannot be changed
      createdAt: existingShow.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString() // Update the modification date
    };

    tvShows[showIndex] = updatedShow;
    return updatedShow;
  },

  // Delete a TV show
  deleteShow: (id) => {
    const showIndex = tvShows.findIndex(show => show.id === id);
    if (showIndex === -1) {
      throw new Error(`TV show with ID ${id} not found`);
    }

    const deletedShow = tvShows[showIndex];
    tvShows.splice(showIndex, 1);
    return deletedShow;
  },

  // Get shows within a time range
  getShowsByTimeRange: (startTime, endTime) => {
    return tvShows.filter(show => {
      const showStart = new Date(show.startTime);
      const showEnd = new Date(show.endTime);
      const rangeStart = new Date(startTime);
      const rangeEnd = new Date(endTime);

      return (showStart >= rangeStart && showStart <= rangeEnd) ||
             (showEnd >= rangeStart && showEnd <= rangeEnd) ||
             (showStart <= rangeStart && showEnd >= rangeEnd);
    });
  },

  // Clear all shows (useful for testing)
  clearAllShows: () => {
    tvShows = [];
    nextId = 1;
  },

  // Reset to initial data (useful for testing)
  resetToInitialData: () => {
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
  }
};

module.exports = {
  TVShow,
  tvScheduleData
};