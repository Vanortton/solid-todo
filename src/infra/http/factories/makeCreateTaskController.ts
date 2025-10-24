import { TaskMapper } from '../../../app/mappers/TaskMapper'
import { MongoDBTaskRepository } from '../../../app/repositories/taskRepository/MongoDBTaskRepository'
import { CreateTaskUseCase } from '../../../app/useCases/createTask/CreateTaskUseCase'
import { prisma } from '../../db/prisma'
import { CreateTaskController } from '../controllers/CreateTaskController'

export default () => {
    const mapper = new TaskMapper()
    const repository = new MongoDBTaskRepository(prisma, mapper)
    const useCase = new CreateTaskUseCase(repository)
    return new CreateTaskController(useCase)
}
