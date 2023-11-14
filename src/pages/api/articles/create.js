import { fetcher } from "@/utils";
import {url} from '@/api'

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const response = await fetcher.post("/articles", req.body, {
          baseURL: `${url}`,
          // headers: {
          //   'Content-Type': 'multipart/form-data'
          // }
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