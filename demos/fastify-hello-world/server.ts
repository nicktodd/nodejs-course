import Fastify from 'fastify';

interface User {
  id: number;
  name: string;
}

const fastify = Fastify();

const users: User[] = [
  { id: 1, name: 'Fred' },
  { id: 2, name: 'Barnie' }
];

fastify.get('/users', async () => {
  return users;
});

fastify.get('/users/:id', async (request) => {
  const { id } = request.params as { id: string };
  return users.find(u => u.id === Number(id));
});

// 4. Start the server
const start = async () => {
  await fastify.listen({ port: 3000 });
};

start();
