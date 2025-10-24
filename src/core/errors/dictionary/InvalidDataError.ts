import { AppError } from '../AppError'

export class InvalidDataError extends AppError {
    constructor(field: string, complement?: string) {
        super(400, 'INVALID_ERROR', `Value of ${field} is invalid. ${complement}`)
    }
}
