import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { TaskAddEditComponent } from './task-add-edit/task-add-edit.component';
import { DataService } from './services/data.service';
import { Todolist } from './_models/todo';
import { users } from './_models/todo'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users!: users[];
  credentials: any;
  username!: string;
  dataLoaded: boolean = false;
  body: any;
  editedData: any;
  constructor(private dialog: MatDialog, private _dataService: DataService) { }
  todoList: Todolist[] = [];
  // userId?:number = this.todoList[0].user_id;
  title = 'to-do';

  ngOnInit() {
    this._dataService.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    })
  }

  openLogin() {
    const dialogRef = this.dialog.open(LoginComponent,
      { data: { users: this.users } });
    dialogRef.afterClosed().subscribe(data => {
      console.log(data);
      this.credentials = btoa([data.UserName, data.Password].join(':'));
      this.username = this.findUserName(data.UserName);
      console.log(this.username);
      console.log(btoa(this.credentials));
      this.getTodoList()
    })
  }
  findUserName(userName: string): any {
    const user = this.users.find(user => user.username === userName)
    return user?.name
  }

  getTodoList(): void {
    this._dataService.getTodo(this.credentials).subscribe(
      todoList => {
        this.todoList = todoList
        this.dataLoaded = true;
      },
      error => {
        this.dataLoaded = false;
      });
  }

  addTask() {
    const dialogRef = this.dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe(data => {
      this.body = data;
      console.log(data);
      this.updateTodoList()
    })
  }

  updateTodoList(): void {
    this._dataService.postTodo(this.credentials, this.body).subscribe(data => {
      console.log(data);
      this.getTodoList()
    })

  }

  delete(id: number) {
    this._dataService.deleteTodo(this.credentials, id).subscribe(data => {
      console.log(data);
      this.getTodoList()

    })
  }

  edit(id: number) {
    const dialogRef = this.dialog.open(TaskAddEditComponent);
    dialogRef.afterClosed().subscribe(data => {
      this.editedData = data;
      console.log(this.editedData);
      this.editTodoList(id)
    })

  }

  editTodoList(id: number) {
    this._dataService.updateTodo(this.credentials, id, this.editedData).subscribe(data => {
      console.log(data);
      this.getTodoList()

    })
  }

  changeStatus(id: number) {
    console.log(id)
    this._dataService.ChangeStatusTodo(this.credentials, id).subscribe(data => {
      console.log(data);
      this.getTodoList()

    })
  }
}
