// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UserModel from '@/models/User';
import { initMongoose } from '@/mongoDB/mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //1) Connecting to MongoDB
  await initMongoose();

  if (req.method === 'POST') {
    const { username, email } = req.body;
    const newUser = await UserModel.create({
      username,
      email,
    });
    res.status(200).json(newUser);
  }
}
