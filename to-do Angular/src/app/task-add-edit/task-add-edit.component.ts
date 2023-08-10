import { Component,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-add-edit',
  templateUrl: './task-add-edit.component.html',
  styleUrls: ['./task-add-edit.component.scss']
})
export class TaskAddEditComponent {
  newtask: FormGroup;
  constructor(private _f: FormBuilder,public dialogRef: MatDialogRef<TaskAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.newtask = this._f.group({
      task:['',Validators.required],
    });
  }
  addTask(){
    console.log(this.newtask)

    if (this.newtask.valid){
      console.log(this.newtask)
      this.dialogRef.close(this.newtask.value)
      this.newtask.reset();

    }
  }

}
