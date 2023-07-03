import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import CryptoJS from 'crypto-js';

const generateSHA1 = (data: any) => {
  const hash = CryptoJS.SHA1(data);
  return hash.toString(CryptoJS.enc.Hex);
};

const generateSignature = (
  publicId: string,
  timestamp: number,
  apiSecret: string
) => {
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

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

  const { publicId } = req.query;

  switch (req.method) {
    case 'DELETE':
      const timestamp = new Date().getTime();
      const signature = generateSHA1(
        generateSignature(
          `client/${publicId}`,
          timestamp,
          process.env.CLOUD_API_SECRET!
        )
      );
      const formData = new FormData();
      formData.append('public_id', `client/${publicId}`);
      formData.append('signature', signature);
      formData.append('api_key', process.env.CLOUD_API_KEY!);
      formData.append('timestamp', timestamp.toString());
      await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
        {
          method: 'POST',
          body: formData,
        }
      );
      res.json({ message: 'Image deleted' });
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
