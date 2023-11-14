import { fetcher } from "@/utils";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {url} from '@/api'

export default async function handler(req, res) {
    const session = await getServerSession(req, res, authOptions)
    const token  = session?.user?.token?.accessToken
    console.log('session', token)
    if (req.method === 'GET') {
        const pageNumber = req.query.page || 1;

      try {
        const response = await fetcher.get(`/articles?page=${pageNumber}`, {
          baseURL: `${url}`,
            headers :{
              Authorization : `Bearer ${token}`
            }
        },);
        const data = response.data;
  
        res.status(200).json(data);
      } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }