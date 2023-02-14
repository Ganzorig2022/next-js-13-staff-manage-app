import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Prisma } from './db.js';
import { gql } from 'graphql-tag';
// import resolvers from './resolvers/index';
// import typeDefs from './typeDefs/index';

(async function () {
  //.gql
  const typeDefs = gql`
    type User {
      id: String
      password: String
      username: String
      email: String
      phone: String
      birthDate: String
      gender: String
    }

    type Query {
      getAllUsers: [User]
    }

    type Mutation {
      createUser(
        id: String
        password: String
        username: String
        email: String
        phone: String
        birthDate: String
        gender: String
      ): User
    }
  `;

  interface createUserInput {
    id: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    birthDate: string;
    gender: string;
  }

  const resolvers = {
    Mutation: {
      createUser: async (_parent: any, args: createUserInput) => {
        //Prisma.user --> "prisma/schema.prisma" dotor model User bga...
        const user = await Prisma.user.create({
          data: {
            password: args.password,
            username: args.username,
            email: args.email,
            phone: args.phone,
            birthDate: args.birthDate,
            gender: args.gender,
          },
        });
        // will receive from the side of frontend
        return user;
      },
      updateUser: async (_parent: any, args: createUserInput) => {
        //Prisma.user --> "prisma/schema.prisma" dotor model User bga...
        const user = await Prisma.user.update({
          where: { email: args.email },
          data: {
            password: args.password,
            username: args.username,
            email: args.email,
            phone: args.phone,
            birthDate: args.birthDate,
            gender: args.gender,
          },
        });
        // will receive from the side of frontend
        return user;
      },
    },

    Query: {
      getAllUsers: async () => {
        return await Prisma.user.findMany(); //get all users array[]
      },
    },
  };
  // Graphql Types vs Prisma Models
  // Post --> id ,title, username

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
