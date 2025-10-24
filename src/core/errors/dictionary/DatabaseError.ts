import { AppError } from '../AppError'

export class DatabaseError extends AppError {
    constructor(error: Error) {
        const stack = error.stack || error.message
        super(500, 'DATABASE_ERROR', 'Failed to complete db operation', stack)
    }
}
