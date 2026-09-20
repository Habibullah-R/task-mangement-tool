export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
    id:number,
    description:string,
    status:TaskStatus,
    created_at:string,
    updated_at:string
}
