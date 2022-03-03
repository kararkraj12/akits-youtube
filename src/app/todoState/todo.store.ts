import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Todo } from './todo.model';

export interface TodoState {
    todos: Todo[];
    isLoaded: boolean;
}

export function createInitialState(): TodoState {
    return {
        todos: [],
        isLoaded: false
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends Store<TodoState> {

    constructor() {
        super(createInitialState());
    }

}
