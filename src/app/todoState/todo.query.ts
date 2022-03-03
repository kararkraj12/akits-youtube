import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter, Observable, take } from 'rxjs';
import { Todo } from './todo.model';
import { TodoStore, TodoState } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TodoQuery extends Query<TodoState> {

    constructor(protected override store: TodoStore) {
        super(store);
    }

    getTodos(): Observable<Todo[]> {
        return this.select(state => state.todos);
    }

    getLoaded(): Observable<boolean> {
        return this.select(state => state.isLoaded).pipe(
            take(1),
            filter(res => !res),
        );
    }

    getLoading(): Observable<boolean> {
        return this.selectLoading();
    }

}
