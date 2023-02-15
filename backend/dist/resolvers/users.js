import { Prisma } from '../db.js';
export const userResolvers = {
    Query: {
        getSingleUser: async (parent, args) => {
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
        createUser: async (_parent, args) => {
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
        updateUser: async (_parent, args) => {
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
    },
};
// https://www.prisma.io/docs/concepts/components/prisma-client/crud#read
