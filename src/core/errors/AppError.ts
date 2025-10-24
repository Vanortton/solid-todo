import { logger } from '../../infra/logger'

export class AppError {
    constructor(
        public httpStatus: number,
        public code: string,
        public message: string,
        public stack?: string
    ) {
        if (httpStatus === 500) logger.error({ message: this.message, stack: this.stack })
    }

    toJSON() {
        return {
            status: this.httpStatus,
            code: this.code,
            message: this.message,
        }
    }
}
