import merge from 'lodash.merge';
import { userResolvers } from './users.js';
const resolvers = merge({}, userResolvers);
export default resolvers;
