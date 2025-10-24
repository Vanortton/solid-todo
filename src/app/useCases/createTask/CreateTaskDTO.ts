import { TaskStatus } from '../../../domain/types/StatusTypes'

export interface CreateTaskDTO {
    userId: string
    task: {
        status: TaskStatus
        description: string
    }
}
