import { Component,Input,Output , EventEmitter} from '@angular/core';
import { Todolist } from '../_models/todo';
// import { DataService } from '../services/data.service';
// import { MatDialog} from '@angular/material/dialog';




@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent {
  @Input() todoList!: Todolist[];
  @Output() idDeleteEmitter = new EventEmitter();
  @Output() idEditEmitter = new EventEmitter();
  @Output() idStatusEmitter = new EventEmitter();
  


  displayedColumns: string[] = ['id', 'task', 'completed','actions'];
  // constructor(private dialog: MatDialog, private _dataService: DataService) {}

  delete(id:number){
    this.idDeleteEmitter.emit(id);
  }

  edit(id:number){
    this.idEditEmitter.emit(id);
    
  }
  changeStatus(id:number){
    this.idStatusEmitter.emit(id);

  }



    
  
}
