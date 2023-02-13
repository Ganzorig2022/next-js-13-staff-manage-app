import merge from 'lodash.merge';
import { moviesResolvers } from './movie';

const resolvers = merge({}, moviesResolvers);

export default resolvers;
