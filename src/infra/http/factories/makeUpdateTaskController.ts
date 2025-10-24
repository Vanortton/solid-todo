import { TaskMapper } from '../../../app/mappers/TaskMapper'
import { MongoDBTaskRepository } from '../../../app/repositories/taskRepository/MongoDBTaskRepository'
import { UpdateTaskUseCase } from '../../../app/useCases/updateTask/UpdateTaskUseCase'
import { prisma } from '../../db/prisma'
import { UpdateTaskController } from '../controllers/UpdateTaskController'

export default () => {
    const mapper = new TaskMapper()
    const repository = new MongoDBTaskRepository(prisma, mapper)
    const useCase = new UpdateTaskUseCase(repository)
    return new UpdateTaskController(useCase)
}
