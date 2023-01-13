import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { UserEditFormComponent } from './user-edit-form/user-edit-form.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  user?: User;
  subscription?: Subscription;
  onDestroy$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params.subscribe((params) =>
      this.userService
        .getUser(params['username'])
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((user) => {
          this.user = user;
        })
    );

  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onEditUser(user: User) {
    const dialogRef = this.dialog.open(UserEditFormComponent, {
      width: '800px',
      data: user,

    });
    dialogRef.afterClosed().subscribe((result) => {
      this.user = user;
      console.log(this.user)
    });
  }
}
