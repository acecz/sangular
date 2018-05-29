import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc = '';
  constructor(private service: TodoService) { }

  ngOnInit() {
  }
  addTodo() {
    const mDesc = this.desc.trim();
    if (!mDesc) { return; }
    this.service.addTodo(mDesc)
      .subscribe(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }
  toggleTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo).subscribe(td => {
        this.todos = [
          ...this.todos.slice(0, i),
          td,
          ...this.todos.slice(i + 1)
        ];
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id).subscribe(_ => {
        this.todos = [
          ...this.todos.slice(0, i),
          ...this.todos.slice(i + 1)
        ];
      });
  }
  getTodos(): void {
    this.service.getTodos().subscribe(todos => this.todos = [...todos]);
  }
}
