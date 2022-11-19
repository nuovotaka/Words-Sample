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
    const { words, transwords, editedperson } = JSON.parse(req.body);
    await client.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        Words: {
          title: [
            {
              text: {
                content: words,
              },
            },
          ],
        },
        Transwords: {
          rich_text: [
            {
              text: {
                content: transwords,
              },
            },
          ],
        },
        EditedPerson: {
          rich_text: [
            {
              text: {
                content: editedperson,
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
