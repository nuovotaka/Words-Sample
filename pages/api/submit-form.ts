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
    const words = req.body.words
    const transwords = req.body.transwords
    const editedperson = req.body.editedperson
    const referenceurl = req.body.referenceurl

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
        ReferenceUrl: {
          url: referenceurl,
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
