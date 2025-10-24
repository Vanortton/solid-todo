import { AppError } from '../AppError'

export class NotFoundError extends AppError {
    constructor(complements?: string) {
        super(400, 'NOT_FOUND', `The resource may not exist. ${complements}`)
    }
}
