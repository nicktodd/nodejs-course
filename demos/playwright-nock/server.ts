import Fastify from 'fastify';
import fetch from 'node-fetch';

const fastify = Fastify();

interface SwapiPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  birth_year: string;
}

// Route that fetches a Star Wars character from SWAPI
fastify.get('/character/:id', async (request, reply) => {
  const { id } = request.params as { id: string };
  
  try {
    // Call SWAPI API to get character data
    const response = await fetch(`https://swapi.dev/api/people/${id}/`);
    
    if (!response.ok) {
      return reply.status(404).send({ error: 'Character not found' });
    }
    
    const character: SwapiPerson = await response.json() as SwapiPerson;
    
    return {
      id: Number(id),
      name: character.name,
      height: character.height,
      mass: character.mass,
      hairColor: character.hair_color,
      birthYear: character.birth_year
    };
  } catch (error) {
    return reply.status(500).send({ error: 'Failed to fetch character' });
  }
});

// Health check endpoint
fastify.get('/health', async () => {
  return { status: 'ok' };
});

// Export for testing
export { fastify };

// Start the server only if this file is run directly
if (require.main === module) {
  const start = async () => {
    try {
      await fastify.listen({ port: 3000 });
      console.log('Server listening on http://localhost:3000');
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };
  
  start();
}
