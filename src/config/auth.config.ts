import dotenv from 'dotenv'
dotenv.config()

export default {
  /* eslint-disable */
  secret: process.env.AUTH_SECRET as string,
  expires: process.env.AUTH_EXPIRES || '1h',
  rounds: process.env.AUTH_ROUNDS || 8 as number
}
