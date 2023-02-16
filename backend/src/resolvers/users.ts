import { Prisma } from '../db.js';

interface userEmailInput {
  email: string;
}

interface createUserInput {
  id: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  birthDate: string;
  gender: string;
}

export const userResolvers = {
  Query: {
    getSingleUser: async (parent: any, args: userEmailInput) => {
      const user = await Prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      return user;
    },

    getAllUsers: async () => {
      const users = await Prisma.user.findMany();
      return users;
    },
  },

  Mutation: {
    createUser: async (_parent: any, args: createUserInput) => {
      //Prisma.user --> "prisma/schema.prisma" dotor model User bga...
      const user = await Prisma.user.create({
        data: {
          email: args.email,
          username: args.username,
          phone: args.phone,
          address: args.address,
          birthDate: args.birthDate,
          gender: args.gender,
        },
      });
      // will receive request from the frontend side
      return user;
    },
    updateUser: async (_parent: any, args: createUserInput) => {
      const { email, address, username, phone, birthDate, gender } = args;
      //Prisma.user --> "prisma/schema.prisma" dotor model User bga...
      const user = await Prisma.user.upsert({
        where: { email: args.email },
        update: {
          email,
          address,
          username,
          phone,
          birthDate,
          gender,
        },
        create: {
          email,
          address,
          username,
          phone,
          birthDate,
          gender,
        },
      });
      // will receive from the side of frontend
      return user;
    },
    deleteUser: async (_parent: any, args: userEmailInput) => {
      try {
        await Prisma.user.delete({
          where: {
            email: args.email,
          },
        });
        return { success: true };
      } catch (error) {}
    },
  },
};

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
