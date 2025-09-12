// Debug script to check imports
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

console.log('typeDefs:', typeof typeDefs);
console.log('resolvers:', typeof resolvers);

if (typeDefs) {
  console.log('typeDefs is defined');
} else {
  console.log('typeDefs is undefined');
}

if (resolvers) {
  console.log('resolvers is defined');
} else {
  console.log('resolvers is undefined');
}
