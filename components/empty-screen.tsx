import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'Demana que te canti una cançó',
    message: "Canta'm una cançó"
  },
  {
    heading: 'Pregunta sobre la seva vida',
    message: 'Com estàs? Com ha anat el teu dia?'
  },
  {
    heading: 'Comenta-li aquella vegada que el vares anar a veure',
    message:
      "Recordes quan vares anar a cantar al teatre principal d'Inca el febrer de 2022?"
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-xl font-semibold">
          Benvingut a Tomeu PenIA! 👋
        </h1>
        <p className="leading-normal text-muted-foreground">
          Pots començar una conversa aquí o provar alguna d&apos;aquestes
          plantilles:
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base text-start"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
