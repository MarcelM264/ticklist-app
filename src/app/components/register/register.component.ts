import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { Subscription } from 'rxjs';
import { User } from '../../model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationType } from '../../enum/notification-type.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/user-profile');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  onRegister(user: User): void {
    this.showLoading = true;
    this.authenticationService.register(user).subscribe({
      next: (response: User) => {
        this.sendNotification(
          NotificationType.SUCCESS,
          `A new account was created for ${response.firstName}.
          Please check your email for password to log in.`
        );
        this.showLoading = false;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
        this.sendNotification(
          NotificationType.ERROR,
          errorResponse.error.message
        );
        this.showLoading = false;
      },
      complete: () => {
        this.showLoading = false;
      },
    });
  }

  sendNotification(error: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(error, message);
    } else {
      this.notificationService.notify(
        error,
        'An error occured. Please try again.'
      );
    }
  }
}
