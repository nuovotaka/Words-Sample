import { NextApiRequest, NextApiResponse } from 'next'
import { NOTION_API_SECRET, DATABASE_ID } from './server-constants'
const { Client } = require('@notionhq/client')

const client = new Client({
  auth: NOTION_API_SECRET,
})

const Addform = async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end()
    return
  }

  try {
    const words = req.body.Words
    const transwords = req.body.Transwords
    const editedperson = req.body.EditedPerson

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
    })
    res.statusCode = 201
    res.end()
  } catch (error) {
    res.statusCode = 500
    res.end()
  }
}

export default Addform
