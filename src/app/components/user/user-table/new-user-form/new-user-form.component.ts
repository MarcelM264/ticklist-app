import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { Role } from 'src/app/enum/role.enum';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent implements OnInit, OnDestroy {
  public fileName: string;
  public profileImage: File;
  public addUserForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  public saveNewUser(): void {
    this.clickButton('new-user-save');
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      // let formData = this.userService.createUserFormData(null, this.addUserForm.value, this.profileImage);
      // formData = {
      //   firstName: this.addUserForm.get('firstName')?.value,
      //   lastName: this.addUserForm.get('lastName')?.value,
      //   username: this.addUserForm.get('username')?.value,
      //   email: this.addUserForm.get('email')?.value,
      //   role: this.addUserForm.get('role')?.value,
      //   // addressDto: {
      //   //   street: this.addMemberForm.get('addressDto.street')?.value,
      //   //   houseNumber: this.addMemberForm.get('addressDto.houseNumber')?.value,
      //   //   postCode: this.addMemberForm.get('addressDto.postCode')?.value,
      //   // },
      // };

      // this.userService.addUser({ formData });
    }
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
