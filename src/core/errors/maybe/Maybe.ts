// Nothing
export class Nothing<J> {
    readonly value = null

    isJust(): this is Just<J> {
        return false
    }

    isEmpty(): this is Nothing<J> {
        return true
    }
}

// Just
export class Just<J> {
    constructor(readonly value: J) {}

    isJust(): this is Just<J> {
        return true
    }

    isEmpty(): this is Nothing<J> {
        return false
    }
}

export type Maybe<T> = Just<T> | Nothing<T>

// Create instances
export const nothing = <R>(): Maybe<R> => new Nothing()
export const just = <R>(value: R): Maybe<R> => new Just(value)
