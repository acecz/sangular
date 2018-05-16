import { Component, OnInit } from '@angular/core';
import { Todo } from './todo.model';
import { TodoService } from './todo.service'

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
    let mDesc = this.desc.trim();
    if (!mDesc) { return; }
    this.service.addTodo(mDesc)
      .subscribe(todo => {
        this.todos.push(todo);
      });
  }

}
