import { fetcher } from "@/utils";
import {url} from '@/api' 

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        const response = await fetcher.get("/categories", {
          baseURL: `${url}`,
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