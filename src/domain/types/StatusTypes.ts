export const taskStatusArray = ['todo', 'in_progress', 'done'] as const
export type TaskStatus = (typeof taskStatusArray)[number]
