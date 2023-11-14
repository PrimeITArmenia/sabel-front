import { fetcher } from "@/utils";
import { authOptions } from '../auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import {url} from '@/api' 

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  const token = session.user.token.accessToken;
  
    if (req.method === 'GET') {
      try {
        const response = await fetcher.get("/user", {
          baseURL: `${url}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
  
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }