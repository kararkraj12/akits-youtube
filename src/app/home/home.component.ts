import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Todo, TodoStatus } from '../todoState/todo.model';
import { TodoQuery } from '../todoState/todo.query';
import { TodoService } from '../todoState/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    loading: boolean = false;
    todos: Todo[] = [];

    constructor(
        private todoQuery: TodoQuery,
        private todoService: TodoService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.todoQuery.getLoading().subscribe(res => this.loading = res);
        this.todoQuery.getTodos().subscribe(res => this.todos = res);
        this.todoQuery.getLoaded().pipe(
            switchMap(() => {
                return this.todoService.getTodos();
            })
        ).subscribe(res => { });
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

}
