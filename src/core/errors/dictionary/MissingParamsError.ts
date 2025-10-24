import { AppError } from '../AppError'

export class MissingParamsError extends AppError {
    constructor(params: string) {
        super(400, 'MISSING_PARAMS', `Missing params: ${params}`)
    }
}
