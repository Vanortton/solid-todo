import { AppError } from '../AppError'

export class UnauthenticatedError extends AppError {
    constructor() {
        super(401, 'UNAUTHENTICATED_ERROR', "You aren't authenticated")
    }
}
