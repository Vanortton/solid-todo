import { describe, expect, it } from 'vitest'
import { just, Maybe, nothing } from './Maybe'

describe('Error Handling - Maybe', () => {
    it('should result isEmpty when return nothing', () => {
        const fn = (): Maybe<true> => nothing()
        expect(fn().isEmpty()).toEqual(true)
        expect(fn().isJust()).toEqual(false)
    })

    it('should result isJust when return just', () => {
        const fn = (): Maybe<[]> => just([])
        expect(fn().isEmpty()).toEqual(false)
        expect(fn().isJust()).toEqual(true)
        expect(fn().value).toEqual([])
    })
})
