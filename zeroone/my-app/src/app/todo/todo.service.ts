import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from '../message.service'
import { Todo } from './todo.model';

@Injectable()
export class TodoService {
  private api_url = 'api/todos';
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  todos: Todo[] = [];

  constructor(private http: HttpClient,private messageService: MessageService) { }

  addTodo(todoItem: string): Observable<Todo> {
    let todo = {
      id: UUID.UUID(),
      desc: todoItem,
      completed: false
    };
      return this.http.post<Todo>(this.api_url, todo, { headers: this.headers }).pipe(
        tap((todo: Todo) => this.log(`added hero w/ id=${todo.id}`)),
        catchError(this.handleError<Todo>('addHero'))
      );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
