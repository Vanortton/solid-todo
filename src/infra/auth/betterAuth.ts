import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import bcrypt from 'bcrypt'
import { Prisma } from '../../generated/prisma'

export const auth = betterAuth({
    database: prismaAdapter(Prisma, { provider: 'sqlite' }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        autoSignIn: true,
        password: {
            hash: password => bcrypt.hash(password, 10),
            verify: ({ hash, password }) => bcrypt.compare(password, hash),
        },
    },
    basePath: '/auth',
})
