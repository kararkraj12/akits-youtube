import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { filter, Observable, of, switchMap, take } from 'rxjs';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { TodoStore, TodoState } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TodoQuery extends Query<TodoState> {

    constructor(
        protected override store: TodoStore,
        private todoService: TodoService
    ) {
        super(store);
    }

    getTodos(): Observable<Todo[]> {
        return this.select(state => state).pipe(
            switchMap((state) => {
                if (state.isLoaded) {
                    return of(state.todos);
                } else {
                    return this.todoService.getTodos();
                }
            })
        );
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
