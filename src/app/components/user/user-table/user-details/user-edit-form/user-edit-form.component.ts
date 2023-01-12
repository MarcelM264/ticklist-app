import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css'],
})
export class UserEditFormComponent implements OnInit {

  editUserForm: FormGroup;

  constructor( public dialogRef: MatDialogRef<UserEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) {}

  ngOnInit(): void {
    this.editUserForm = new FormGroup({
      currentUsername: new FormControl(null, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      lastName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      username: new FormControl(null, {
        validators: [Validators.required],
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      role: new FormControl(null, {
        validators: [Validators.required],
      }),
      isActive: new FormControl( {

      }),
      isNotLocked: new FormControl( {

      }),
    });
  }
}
