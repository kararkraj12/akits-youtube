import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { Todo, TodoStatus } from '../todoState/todo.model';
import { TodoQuery } from '../todoState/todo.query';
import { TodoService } from '../todoState/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    loading: boolean = false;
    todos: Todo[] = [];
    takeUntilSubject: Subject<boolean> = new Subject<boolean>();

    constructor(
        private todoQuery: TodoQuery,
        private todoService: TodoService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.todoQuery.getLoading().pipe(takeUntil(this.takeUntilSubject)).subscribe(res => this.loading = res);
        this.todoQuery.getTodos().pipe(takeUntil(this.takeUntilSubject)).subscribe(res => this.todos = res);
    }

    markAsComplete(id: string): void {
        this.todoService.updateTodo(id, { status: TodoStatus.DONE }).subscribe({
            next: (res) => this.toastr.success("Todo completed."),
            error: (err) => console.log(err)
        });
    }

    deleteTodo(id: string): void {
        this.todoService.deleteTodo(id).subscribe({
            next: res => this.toastr.success("Todo deleted."),
            error: (err) => console.log(err)
        })
    }

    todoTrackBy(index: number, todo: Todo): string {
        return todo._id;
    }

    ngOnDestroy() {
        this.takeUntilSubject.next(true);
        this.takeUntilSubject.complete();
    }

}
