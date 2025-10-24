import { TaskProps } from '../../../domain/entities/Task'

export interface UpdateTaskDTO {
    userId: string
    task: Partial<TaskProps> & { id: string }
}
