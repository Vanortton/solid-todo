import { Type } from 'typebox'
import { taskStatusArray } from '../../../domain/types/StatusTypes'

export const StatusLiterals = taskStatusArray.map(s => Type.Literal(s))

export const CreateTaskSchema = Type.Object({
    status: Type.Union(StatusLiterals),
    description: Type.String({ minLength: 3 }),
})
