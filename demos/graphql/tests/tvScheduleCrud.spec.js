const { test, expect } = require('@playwright/test');
const { graphqlQuery, queries, mutations, testData, validators } = require('./utils/graphqlTestUtils');

test.describe('TV Schedule GraphQL API - CRUD Operations', () => {
  
  // Setup: Reset data before each test
  test.beforeEach(async () => {
    await graphqlQuery(mutations.resetToInitialData);
  });

  test.describe('CREATE Operations', () => {
    
    test('should create a new TV show with all required fields', async () => {
      const result = await graphqlQuery(mutations.createShow, {
        input: testData.sampleShow
      });

      expect(result.createShow).toBeDefined();
      expect(result.createShow.id).toBeDefined();
      expect(result.createShow.title).toBe(testData.sampleShow.title);
      expect(result.createShow.channel).toBe(testData.sampleShow.channel);
      expect(result.createShow.startTime).toBe(testData.sampleShow.startTime);
      expect(result.createShow.endTime).toBe(testData.sampleShow.endTime);
      expect(result.createShow.description).toBe(testData.sampleShow.description);
      expect(result.createShow.genre).toBe(testData.sampleShow.genre);
      expect(result.createShow.createdAt).toBeDefined();
      expect(result.createShow.updatedAt).toBeDefined();
      
      // Validate the structure
      validators.validateTVShow(result.createShow);
    });

    test('should create a TV show with default genre when genre is not provided', async () => {
      const showWithoutGenre = {
        title: "Show Without Genre",
        channel: "Test Channel",
        startTime: "2024-01-15T22:00:00Z",
        endTime: "2024-01-15T23:00:00Z",
        description: "A show without specified genre"
      };

      const result = await graphqlQuery(mutations.createShow, {
        input: showWithoutGenre
      });

      expect(result.createShow.genre).toBe('General');
    });

    test('should fail to create a TV show with missing required fields', async () => {
      const incompleteShow = {
        title: "Incomplete Show"
        // Missing other required fields
      };

      await expect(async () => {
        await graphqlQuery(mutations.createShow, {
          input: incompleteShow
        });
      }).rejects.toThrow();
    });

    test('should fail to create a TV show with invalid date format', async () => {
      const showWithInvalidDate = {
        title: "Invalid Date Show",
        channel: "Test Channel",
        startTime: "invalid-date",
        endTime: "2024-01-15T23:00:00Z",
        description: "Show with invalid date"
      };

      await expect(async () => {
        await graphqlQuery(mutations.createShow, {
          input: showWithInvalidDate
        });
      }).rejects.toThrow();
    });

    test('should fail to create a TV show where start time is after end time', async () => {
      const showWithInvalidTimeRange = {
        title: "Invalid Time Range Show",
        channel: "Test Channel",
        startTime: "2024-01-15T23:00:00Z",
        endTime: "2024-01-15T22:00:00Z", // End time before start time
        description: "Show with invalid time range"
      };

      await expect(async () => {
        await graphqlQuery(mutations.createShow, {
          input: showWithInvalidTimeRange
        });
      }).rejects.toThrow();
    });
  });

  test.describe('READ Operations', () => {
    
    test('should retrieve all TV shows', async () => {
      const result = await graphqlQuery(queries.getAllShows);
      
      expect(result.shows).toBeDefined();
      expect(Array.isArray(result.shows)).toBeTruthy();
      expect(result.shows.length).toBeGreaterThan(0);
      
      // Validate each show structure
      validators.validateTVShowArray(result.shows);
    });

    test('should retrieve a specific TV show by ID', async () => {
      // First get all shows to get a valid ID
      const allShows = await graphqlQuery(queries.getAllShows);
      const firstShow = allShows.shows[0];

      const result = await graphqlQuery(queries.getShowById, {
        id: firstShow.id
      });

      expect(result.show).toBeDefined();
      expect(result.show.id).toBe(firstShow.id);
      expect(result.show.title).toBe(firstShow.title);
      validators.validateTVShow(result.show);
    });

    test('should return null for non-existent show ID', async () => {
      await expect(async () => {
        await graphqlQuery(queries.getShowById, {
          id: "999999"
        });
      }).rejects.toThrow();
    });

    test('should retrieve shows by channel', async () => {
      const result = await graphqlQuery(queries.getShowsByChannel, {
        channel: "BBC"
      });

      expect(result.showsByChannel).toBeDefined();
      expect(Array.isArray(result.showsByChannel)).toBeTruthy();
      
      // All returned shows should contain "BBC" in the channel name
      result.showsByChannel.forEach(show => {
        expect(show.channel.toLowerCase()).toContain('bbc');
      });
    });

    test('should retrieve shows by genre', async () => {
      const result = await graphqlQuery(queries.getShowsByGenre, {
        genre: "News"
      });

      expect(result.showsByGenre).toBeDefined();
      expect(Array.isArray(result.showsByGenre)).toBeTruthy();
      
      // All returned shows should have the specified genre
      result.showsByGenre.forEach(show => {
        expect(show.genre.toLowerCase()).toBe('news');
      });
    });

    test('should retrieve shows by time range', async () => {
      const result = await graphqlQuery(queries.getShowsByTimeRange, {
        startTime: "2024-01-15T06:00:00Z",
        endTime: "2024-01-15T08:00:00Z"
      });

      expect(result.showsByTimeRange).toBeDefined();
      expect(Array.isArray(result.showsByTimeRange)).toBeTruthy();
    });

    test('should retrieve all available channels', async () => {
      const result = await graphqlQuery(queries.getChannels);

      expect(result.channels).toBeDefined();
      expect(Array.isArray(result.channels)).toBeTruthy();
      expect(result.channels.length).toBeGreaterThan(0);
      
      // Should be sorted and unique
      const sortedChannels = [...result.channels].sort();
      expect(result.channels).toEqual(sortedChannels);
    });

    test('should retrieve all available genres', async () => {
      const result = await graphqlQuery(queries.getGenres);

      expect(result.genres).toBeDefined();
      expect(Array.isArray(result.genres)).toBeTruthy();
      expect(result.genres.length).toBeGreaterThan(0);
      
      // Should be sorted and unique
      const sortedGenres = [...result.genres].sort();
      expect(result.genres).toEqual(sortedGenres);
    });
  });

  test.describe('UPDATE Operations', () => {
    
    test('should update an existing TV show', async () => {
      // First create a show to update
      const createResult = await graphqlQuery(mutations.createShow, {
        input: testData.sampleShow
      });
      const createdShowId = createResult.createShow.id;

      // Update the show
      const updateResult = await graphqlQuery(mutations.updateShow, {
        id: createdShowId,
        input: testData.updatedShow
      });

      expect(updateResult.updateShow).toBeDefined();
      expect(updateResult.updateShow.id).toBe(createdShowId);
      expect(updateResult.updateShow.title).toBe(testData.updatedShow.title);
      expect(updateResult.updateShow.description).toBe(testData.updatedShow.description);
      expect(updateResult.updateShow.genre).toBe(testData.updatedShow.genre);
      
      // Original fields should remain unchanged if not updated
      expect(updateResult.updateShow.channel).toBe(testData.sampleShow.channel);
      expect(updateResult.updateShow.startTime).toBe(testData.sampleShow.startTime);
      expect(updateResult.updateShow.endTime).toBe(testData.sampleShow.endTime);
      
      // Timestamps should be updated
      expect(updateResult.updateShow.createdAt).toBe(createResult.createShow.createdAt);
      expect(updateResult.updateShow.updatedAt).not.toBe(createResult.createShow.updatedAt);
      
      validators.validateTVShow(updateResult.updateShow);
    });

    test('should update only specified fields', async () => {
      // First create a show to update
      const createResult = await graphqlQuery(mutations.createShow, {
        input: testData.sampleShow
      });
      const createdShowId = createResult.createShow.id;

      // Update only the title
      const updateResult = await graphqlQuery(mutations.updateShow, {
        id: createdShowId,
        input: { title: "Only Title Updated" }
      });

      expect(updateResult.updateShow.title).toBe("Only Title Updated");
      // All other fields should remain the same
      expect(updateResult.updateShow.channel).toBe(testData.sampleShow.channel);
      expect(updateResult.updateShow.description).toBe(testData.sampleShow.description);
      expect(updateResult.updateShow.genre).toBe(testData.sampleShow.genre);
    });

    test('should fail to update non-existent show', async () => {
      await expect(async () => {
        await graphqlQuery(mutations.updateShow, {
          id: "999999",
          input: testData.updatedShow
        });
      }).rejects.toThrow();
    });

    test('should fail to update show with invalid time range', async () => {
      // First create a show to update
      const createResult = await graphqlQuery(mutations.createShow, {
        input: testData.sampleShow
      });
      const createdShowId = createResult.createShow.id;

      // Try to update with invalid time range
      await expect(async () => {
        await graphqlQuery(mutations.updateShow, {
          id: createdShowId,
          input: {
            startTime: "2024-01-15T23:00:00Z",
            endTime: "2024-01-15T22:00:00Z" // End before start
          }
        });
      }).rejects.toThrow();
    });
  });

  test.describe('DELETE Operations', () => {
    
    test('should delete an existing TV show', async () => {
      // First create a show to delete
      const createResult = await graphqlQuery(mutations.createShow, {
        input: testData.sampleShow
      });
      const createdShowId = createResult.createShow.id;

      // Delete the show
      const deleteResult = await graphqlQuery(mutations.deleteShow, {
        id: createdShowId
      });

      expect(deleteResult.deleteShow).toBeDefined();
      expect(deleteResult.deleteShow.id).toBe(createdShowId);
      expect(deleteResult.deleteShow.title).toBe(testData.sampleShow.title);

      // Verify the show is actually deleted
      await expect(async () => {
        await graphqlQuery(queries.getShowById, {
          id: createdShowId
        });
      }).rejects.toThrow();
    });

    test('should fail to delete non-existent show', async () => {
      await expect(async () => {
        await graphqlQuery(mutations.deleteShow, {
          id: "999999"
        });
      }).rejects.toThrow();
    });
  });

  test.describe('Data Management Operations', () => {
    
    test('should clear all shows', async () => {
      // Verify there are shows initially
      const initialShows = await graphqlQuery(queries.getAllShows);
      expect(initialShows.shows.length).toBeGreaterThan(0);

      // Clear all shows
      const clearResult = await graphqlQuery(mutations.clearAllShows);
      expect(clearResult.clearAllShows).toBe(true);

      // Verify all shows are cleared
      const afterClearShows = await graphqlQuery(queries.getAllShows);
      expect(afterClearShows.shows.length).toBe(0);
    });

    test('should reset to initial data', async () => {
      // First clear all shows
      await graphqlQuery(mutations.clearAllShows);
      
      // Verify shows are cleared
      const clearedShows = await graphqlQuery(queries.getAllShows);
      expect(clearedShows.shows.length).toBe(0);

      // Reset to initial data
      const resetResult = await graphqlQuery(mutations.resetToInitialData);
      expect(resetResult.resetToInitialData).toBe(true);

      // Verify initial data is restored
      const restoredShows = await graphqlQuery(queries.getAllShows);
      expect(restoredShows.shows.length).toBeGreaterThan(0);
      
      // Should have the initial shows
      const expectedTitles = ["Morning News", "Cooking Masters", "Science Documentary"];
      const actualTitles = restoredShows.shows.map(show => show.title);
      expectedTitles.forEach(title => {
        expect(actualTitles).toContain(title);
      });
    });
  });

  test.describe('Complex Scenarios', () => {
    
    test('should handle multiple operations in sequence', async () => {
      // Create multiple shows
      const createdShows = [];
      for (const showData of testData.multipleSampleShows) {
        const result = await graphqlQuery(mutations.createShow, {
          input: showData
        });
        createdShows.push(result.createShow);
      }

      // Verify all shows were created
      expect(createdShows.length).toBe(testData.multipleSampleShows.length);

      // Update one of the shows
      const showToUpdate = createdShows[0];
      const updateResult = await graphqlQuery(mutations.updateShow, {
        id: showToUpdate.id,
        input: { title: "Updated in Sequence Test" }
      });
      expect(updateResult.updateShow.title).toBe("Updated in Sequence Test");

      // Delete one of the shows
      const showToDelete = createdShows[1];
      const deleteResult = await graphqlQuery(mutations.deleteShow, {
        id: showToDelete.id
      });
      expect(deleteResult.deleteShow.id).toBe(showToDelete.id);

      // Verify final state
      const finalShows = await graphqlQuery(queries.getAllShows);
      const finalShowIds = finalShows.shows.map(show => show.id);
      expect(finalShowIds).toContain(showToUpdate.id);
      expect(finalShowIds).not.toContain(showToDelete.id);
    });

    test('should handle edge case time ranges', async () => {
      // Create a show that spans midnight
      const midnightShow = {
        title: "Midnight Show",
        channel: "Night Channel",
        startTime: "2024-01-15T23:30:00Z",
        endTime: "2024-01-16T00:30:00Z",
        description: "A show that spans midnight"
      };

      const createResult = await graphqlQuery(mutations.createShow, {
        input: midnightShow
      });
      expect(createResult.createShow).toBeDefined();

      // Query for shows in the time range
      const timeRangeResult = await graphqlQuery(queries.getShowsByTimeRange, {
        startTime: "2024-01-15T23:00:00Z",
        endTime: "2024-01-16T01:00:00Z"
      });

      const foundShow = timeRangeResult.showsByTimeRange.find(
        show => show.id === createResult.createShow.id
      );
      expect(foundShow).toBeDefined();
    });
  });
});