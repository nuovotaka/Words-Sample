import { NOTION_API_SECRET, DATABASE_ID } from './server-constants'
import { Client } from '@notionhq/client';

const client = new Client({
  auth: NOTION_API_SECRET,
})

let database_id: any
export default async function handler(req: { method: string; body: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; msg?: string; }): void; new(): any; }; }; }) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
  try {
    const { name, email, purpose, message } = JSON.parse(req.body);
    await client.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Purpose: {
          select: {
            name: purpose,
          },
        },
        Message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });
    res.status(201).json({ msg: 'Success' });
  } catch (error) {
    res.status(500).json({ msg: 'There was an error' });
  }
}
