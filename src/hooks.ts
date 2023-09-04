interface HandlerProps {
  event: Event
  resolve: (event: Event, context: any) => any
}

export function handle({ event, resolve }: HandlerProps) {
  return resolve(event, {
    ssr: false
  })
}