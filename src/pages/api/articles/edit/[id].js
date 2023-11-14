import { fetcher } from "@/utils";
import {url} from '@/api'


export default async function handler(req, res) {
    const { query: { id } } = req;
    if (req.method === 'PUT') {
      try {
        const response = await fetcher.put(`/articles/${id}`, req.body, {
          baseURL: `${url}`
        });
        const data = response.data;
  
        res.status(200).json({ message: 'Data received successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Invalid data' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }