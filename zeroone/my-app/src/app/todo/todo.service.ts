import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service';
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private api_url = 'api/todos';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  todos: Todo[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) { }

  addTodo(todoItem: string): Observable<Todo> {
    const todo = {
      id: UUID.UUID(),
      desc: todoItem,
      completed: false
    };
    return this.http.post<Todo>(this.api_url, todo, { headers: this.headers }).pipe(
      tap((td: Todo) => this.log(`added todo w/ id=${td.id}`)),
      catchError(this.handleError<Todo>('addTodo'))
    );
  }
  // PUT /todos/:id
  toggleTodo(todo: Todo): Observable<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    const updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.http.put<Todo>(url, JSON.stringify(updatedTodo), { headers: this.headers }).pipe(
      tap((td: Todo) => this.log(`toggle todo todo w/ id=${td.id}`)),
      catchError(this.handleError<Todo>('toggleTodo'))
    );
  }
  // DELETE /todos/:id
  deleteTodoById(id: string): Observable<any> {
    const url = `${this.api_url}/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      tap(_ => this.log(`delete todo by Id todo w/ id=${id}`)),
      catchError(this.handleError<Todo>('deleteTodoById'))
    );
  }
  // GET /todos
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api_url)
      .pipe(
        tap(todos => this.log(`fetched todos`)),
        catchError(this.handleError('getTodos', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
