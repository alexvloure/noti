import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

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

  const { id } = req.query;

  switch (req.method) {
    case 'DELETE':
      const client = await prisma.client.delete({
        where: { id: id as string },
      });
      res.json({ client });
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
