export interface Todolist{
    id: number,
    user_id: number,
    task: string,
    completed: boolean
}


export interface TodoBody{
    task:string,
}
export interface users{
    id: number,
    name: string,
    avatar: string
    username: string
}