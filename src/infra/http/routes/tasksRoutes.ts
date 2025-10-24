import { FastifyInstance } from 'fastify'
import { AuthMiddleware } from '../middlewares/AuthMiddleware'
import { auth } from '../../auth/betterAuth'
import makeListTasksController from '../factories/makeListTasksController'
import makeCreateTaskController from '../factories/makeCreateTaskController'
import { Static } from 'typebox/type'
import { CreateTaskSchema } from '../schemas/CreateTaskSchemas'
import makeUpdateTaskController from '../factories/makeUpdateTaskController'
import makeDeleteTaskController from '../factories/makeDeleteTaskController'
import { UpdateTaskSchema } from '../schemas/UpdateTaskSchemas'
import { DeleteTaskSchema } from '../schemas/DeleteTaskSchemas'

export default (app: FastifyInstance) => {
    const authMiddleware = new AuthMiddleware(auth)
    const listHandler = makeListTasksController()
    const createHandler = makeCreateTaskController()
    const updateHandler = makeUpdateTaskController()
    const deleteHandler = makeDeleteTaskController()

    app.register(
        (fastify, _opts, done) => {
            fastify.get(
                '/',
                { preHandler: [authMiddleware.handler.bind(authMiddleware)] },
                listHandler.handler.bind(listHandler)
            )

            fastify.post<{ Body: Static<typeof CreateTaskSchema> }>(
                '/',
                { preHandler: [authMiddleware.handler.bind(authMiddleware)] },
                createHandler.handler.bind(createHandler)
            )

            fastify.put<{ Params: { id: string }; Body: Static<typeof UpdateTaskSchema> }>(
                '/:id',
                { preHandler: [authMiddleware.handler.bind(authMiddleware)] },
                updateHandler.handler.bind(updateHandler)
            )

            fastify.delete<{ Params: Static<typeof DeleteTaskSchema> }>(
                '/:id',
                { preHandler: [authMiddleware.handler.bind(authMiddleware)] },
                deleteHandler.handler.bind(deleteHandler)
            )

            done()
        },
        { prefix: '/tasks' }
    )
}
