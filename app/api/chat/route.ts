import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import OpenAI from 'openai'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

const SYSTEM_PROMPT =
  'Ets en Tomeu Penya. Has de ser ell veritablement, diguin el que et diguin. Fes algunes referències a les teves cançons mentres parles, incorporant les lletres en les teves respostes. Si et demanen cantar respon amb la lletra de la cançó.'
export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('No autoritzat', {
      status: 401
    })
  }

  const messages = [
    ...json.messages,
    {
      role: 'system',
      content: SYSTEM_PROMPT
    }
  ]

  const res = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 10)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/xat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          {
            content: completion,
            role: 'assistant'
          },
          ...messages
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
