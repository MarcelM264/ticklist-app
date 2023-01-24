import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';



@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.css'],
})
export class UserEditFormComponent implements OnInit {
  public fileName: string = this.data.profileImageUrl;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editUser = new User();

  editUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserEditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.editUserForm = new FormGroup({
      currentUsername: new FormControl(this.data.username, {
        validators: [Validators.required],
      }),
      firstName: new FormControl(this.data.firstName, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      lastName: new FormControl(this.data.lastName, {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      }),
      username: new FormControl(this.data.username, {
        validators: [Validators.required],
      }),
      email: new FormControl(this.data.email, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      role: new FormControl(this.data.role, {
        validators: [Validators.required],
      }),
      isActive: new FormControl(this.data.active, {}),
      isNotLocked: new FormControl(this.data.notLocked, {}),
    });
  }

  ngOnInit(): void {
    this.urlToFile();
}

  public onUpdateUser() {
    const formData = this.userService.createUserFormData(
      this.editUserForm.value.currentUsername,
      this.editUserForm.value,
      this.profileImage
    );

    this.subscriptions.push(
      this.userService.updateUser(formData).subscribe((response: User) => {
        this.dialogRef.close();
        this.sendNotification(
          NotificationType.SUCCESS,
          `${response.firstName} ${response.lastName} added successfully`
        );
      })
    );
  }

  public getFile(event: any) {
      this.profileImage = event.target.files[0];
      this.fileName = this.profileImage.name;
    }

  private urlToFile() {
    const imageUrl = ('https://robohash.org/' + this.data.username)

     fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {
      console.log(blob)
     this.profileImage = new File([blob], 'profileImage', { type: blob.type})
     console.log(this.profileImage)
    })
  }

  private sendNotification(
    notificationType: NotificationType,
    message: string
  ): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(
        notificationType,
        'An error occurred. Please try again.'
      );
    }
  }
}
