const movies = [
  {
    title: 'Edward Scissorhands',
    director: 'Tim Burton',
  },
  {
    title: 'The Terrifier 2',
    director: 'Damien Leone',
  },
];

export const moviesResolvers = {
  Query: {
    movies: () => movies,
  },
};
