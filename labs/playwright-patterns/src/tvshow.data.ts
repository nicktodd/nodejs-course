import { TVShow, User } from './tvshow.schema';

export const tvshows: TVShow[] = [
  {
    id: 1,
    title: 'Doctor Who',
    genre: 'Sci-Fi',
    seasons: 13,
    rating: 8.6,
    description: 'A time-traveling alien explores the universe.',
    imageUrl: 'https://example.com/doctorwho.jpg'
  },
  {
    id: 2,
    title: 'Sherlock',
    genre: 'Crime',
    seasons: 4,
    rating: 9.1,
    description: 'Modern adaptation of Sherlock Holmes in London.',
    imageUrl: 'https://example.com/sherlock.jpg'
  },
  {
    id: 3,
    title: 'The Great British Bake Off',
    genre: 'Reality',
    seasons: 14,
    rating: 8.7,
    description: 'Amateur bakers compete in weekly challenges.',
    imageUrl: 'https://example.com/gbbo.jpg'
  },
  {
    id: 4,
    title: 'Black Mirror',
    genre: 'Drama',
    seasons: 6,
    rating: 8.8,
    description: 'Anthology series exploring technology and society.',
    imageUrl: 'https://example.com/blackmirror.jpg'
  },
  {
    id: 5,
    title: 'Downton Abbey',
    genre: 'Historical Drama',
    seasons: 6,
    rating: 8.7,
    description: 'Life of the aristocratic Crawley family and their servants.',
    imageUrl: 'https://example.com/downton.jpg'
  },
  {
    id: 6,
    title: 'Peaky Blinders',
    genre: 'Crime',
    seasons: 6,
    rating: 8.8,
    description: 'A gangster family epic set in 1900s Birmingham.',
    imageUrl: 'https://example.com/peakyblinders.jpg'
  }
];

export const users: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    username: 'user1',
    password: 'password123',
    role: 'user'
  }
];
