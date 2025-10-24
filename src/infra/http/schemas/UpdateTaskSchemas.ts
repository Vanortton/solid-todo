import Type from 'typebox'
import { StatusLiterals } from './CreateTaskSchemas'

export const UpdateTaskSchema = Type.Object({
    status: Type.Optional(Type.Union(StatusLiterals)),
    description: Type.Optional(Type.String({ min: 3 })),
})
