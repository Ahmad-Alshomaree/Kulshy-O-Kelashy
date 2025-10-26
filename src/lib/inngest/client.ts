import { Inngest } from 'inngest'

export const inngest = new Inngest({
  id: 'ecoshop',
  name: 'EcoShop',
  eventKey: process.env.INNGEST_EVENT_KEY,
})
