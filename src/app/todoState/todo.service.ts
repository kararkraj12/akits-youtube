import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Todo, TodoStatus } from './todo.model';
import { TodoStore } from './todo.store';

@Injectable({ providedIn: 'root' })
export class TodoService {

    constructor(
        private todoStore: TodoStore,
        private http: HttpClient
    ) { }

    addTodo(title: string, description: string): Observable<Todo> {
        this.todoStore.setLoading(true);
        return this.http.post<Todo>(environment.baseUrl, { title, description }).pipe(
            tap(res => {
                this.todoStore.update(state => {
                    return {
                        todos: [
                            ...state.todos,
                            res
                        ]
                    }
                });
                this.todoStore.setLoading(false);
            })
        );
    }

    getTodos(): Observable<Todo[]> {
        this.todoStore.setLoading(true);
        return this.http.get<{ data: Todo[] }>(environment.baseUrl).pipe(
            tap(res => {
                this.todoStore.update(state => {
                    return {
                        todos: res.data,
                        isLoaded: true
                    };
                });
                this.todoStore.setLoading(false);
            }),
            map((res: { data: Todo[] }) => res.data)
        );
    }

    deleteTodo(id: string): Observable<Todo> {
        return this.http.delete<Todo>(`${environment.baseUrl}/${id}`).pipe(
            tap(res => {
                this.todoStore.update(state => {
                    return {
                        ...state,
                        todos: state.todos.filter(t => t._id !== id)
                    }
                });
            })
        );
    }

    updateTodo(id: string, changes: any): Observable<Todo> {
        return this.http.put<Todo>(`${environment.baseUrl}/${id}`, changes).pipe(
            tap(res => {
                this.todoStore.update(state => {
                    const todos = [...state.todos];
                    const index = todos.findIndex(t => t._id === id);
                    todos[index] = {
                        ...todos[index],
                        status: TodoStatus.DONE
                    };
                    return {
                        ...state,
                        todos
                    };
                })
            })
        );
    }


}
