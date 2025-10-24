import 'dotenv/config'
import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
    DATABASE_URL: str(),
    BETTER_AUTH_SECRET: str(),
    FRONT_URL: str(),
})
