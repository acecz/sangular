import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import 'rxjs/add/operator/toPromise';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private api_url = 'api/todos';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  todos: Todo[] = [];

  constructor(private http: HttpClient) { }

  addTodo(todoItem: string): Promise<Todo> {
    let todo = {
      id: UUID.UUID(),
      desc: todoItem,
      completed: false
    };
    return this.http.post(this.api_url, JSON.stringify(todo), { headers: this.headers }).toPromise().
      then().catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
