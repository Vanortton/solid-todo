import { app } from './app'

app.listen({ port: parseInt(process.env.PORT || '3000') })
