import prisma from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

// POST /api/client
// Required fields in body: fullName, position, avatar
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // @ts-ignore
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  switch (req.method) {
    case 'POST':
      const data = JSON.parse(req.body);
      const { name, position, avatar } = data;
      console.log(data);
      const newClient = await prisma.client.create({
        data: {
          name: name,
          position: position,
          avatar: avatar,
          author: { connect: { email: session?.user?.email! } },
        },
      });
      res.json(newClient);
      break;
    case 'GET':
      const clients = await prisma.client.findMany({
        where: { author: { email: session?.user?.email! } },
      });
      res.json(clients);
      break;
  }
}
