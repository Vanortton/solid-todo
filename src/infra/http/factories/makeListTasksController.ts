import { TaskMapper } from '../../../app/mappers/TaskMapper'
import { MongoDBTaskRepository } from '../../../app/repositories/taskRepository/MongoDBTaskRepository'
import { ListTasksUseCase } from '../../../app/useCases/listTasks/ListTasksUseCase'
import { prisma } from '../../db/prisma'
import { ListTasksController } from '../controllers/ListTasksController'

export default () => {
    const mapper = new TaskMapper()
    const repository = new MongoDBTaskRepository(prisma, mapper)
    const useCase = new ListTasksUseCase(repository)
    return new ListTasksController(useCase)
}
