import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todolist,TodoBody,users } from '../_models/todo';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<users[]>{
    return this.http.get<users[]>(`http://localhost:4000/users`)
  }

  getTodo(credentials: any): Observable<Todolist[]> {
    const headers = new HttpHeaders({
      'Authorization': `basic ${credentials}`
    })
    console.log(`http://localhost:4000/todos`,credentials)
    return this.http.get<Todolist[]>(`http://localhost:4000/todos`,{
      headers });
  }

  postTodo(credentials: any, body:TodoBody): Observable<TodoBody>{
    const headers = new HttpHeaders({
      'Authorization': `basic ${credentials}`
    })
    return this.http.post<TodoBody>(`http://localhost:4000/todos`,body,{headers});
    
  }

  deleteTodo(credentials: any, id:number){
    const headers = new HttpHeaders({
      'Authorization': `basic ${credentials}`
    })
    return this.http.delete(`http://localhost:4000/todos/${id}`,{headers});
  }

  updateTodo(credentials:any, id:number, body:TodoBody){
    const headers = new HttpHeaders({
      'Authorization': `basic ${credentials}`
    })
    return this.http.patch(`http://localhost:4000/todos/${id}`,body,{headers});
  }

  ChangeStatusTodo(credentials:any, id:number){
    const headers = new HttpHeaders({
      'Authorization': `basic ${credentials}`
    })
    return this.http.put(`http://localhost:4000/todos/${id}`,{},{headers});
  }

}
