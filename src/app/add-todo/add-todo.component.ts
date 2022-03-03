import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { TodoService } from '../todoState/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-add-todo',
    templateUrl: './add-todo.component.html',
    styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

    form: FormGroup

    constructor(
        private todoService: TodoService,
        private toastr: ToastrService
    ) {
        this.form = new FormGroup({
            title: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required])
        })
    }

    ngOnInit(): void {
    }

    addTodo(form: FormGroupDirective) {
        this.todoService.addTodo(this.form.controls['title'].value, this.form.controls['description'].value).subscribe({
            next: res => {
                this.toastr.success("Todo successfully added.");
                form.resetForm();
            },
            error: (err) => console.log(err)
        });
    }

}
