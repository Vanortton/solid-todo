import { describe, expect, it } from 'vitest'
import { AppError } from './AppError'

describe('AppError Class', () => {
    it('should toJSON method return a plain object', () => {
        const data = {
            status: 500,
            code: 'FAKE_ERROR',
            message: 'This is a exemple of error',
        } as const
        const dataArray = [data.status, data.code, data.message] as const
        const error = new AppError(...dataArray)
        expect(error.toJSON()).toEqual(data)
    })
})
