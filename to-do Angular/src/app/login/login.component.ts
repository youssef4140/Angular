import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials: FormGroup;
  constructor(private _f: FormBuilder,public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.credentials = this._f.group({
      UserName:['',Validators.required],
      Password: ['',Validators.required],
    });
  }


  onLogin(){
    if (this.credentials.valid){
      this.dialogRef.close(this.credentials.value)
    }
  }
}
