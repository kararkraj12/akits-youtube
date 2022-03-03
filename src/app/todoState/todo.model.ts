export interface Todo {
    _id: string;
    title: string;
    description: string;
    status: string;
}

export enum TodoStatus {
    OPEN = 'open',
    DONE = 'done'
}
