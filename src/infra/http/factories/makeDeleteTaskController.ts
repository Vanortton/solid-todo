import { TaskMapper } from '../../../app/mappers/TaskMapper'
import { MongoDBTaskRepository } from '../../../app/repositories/taskRepository/MongoDBTaskRepository'
import { DeleteTaskUseCase } from '../../../app/useCases/deleteTask/DeleteTaskUseCase'
import { prisma } from '../../db/prisma'
import { DeleteTaskController } from '../controllers/DeleteTaskController'

export default () => {
    const mapper = new TaskMapper()
    const repository = new MongoDBTaskRepository(prisma, mapper)
    const useCase = new DeleteTaskUseCase(repository)
    return new DeleteTaskController(useCase)
}
