import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { Subscription} from 'rxjs';
import { NotificationService } from 'src/app/service/notification.service';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource: MatTableDataSource<User>;
  data: User[] = [];
  refreshing: boolean;
  user: User;
  private subscriptions: Subscription[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['profileImageUrl', 'userId', 'firstName', 'lastName', 'username', 'email', 'isActive', 'details', 'delete'];

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private notificationService: NotificationService
  ) {

  }
  ngOnInit(): void {
    this.getUsers(true);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getUsers(showNotification: boolean): void {
    const observer = {
      next: (response: User[]) => {
        this.userService.addUsersToLocalCache(response);
        this.data = response;
        this.dataSource = new MatTableDataSource<User>(this.data);
        this.refreshing = false;
        if (showNotification) {
          this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded succesfully.`)
        }
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
        this.refreshing = false;
      },
      complete: () => { this.refreshing = false}
    };

    this.subscriptions.push(this.userService.getUsers().subscribe(observer));
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

  onDeleteMember(userId: number) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddFormDialog(enterAnimation: any) {
    this.dialog.open(NewUserFormComponent, {
      enterAnimationDuration: enterAnimation,
      exitAnimationDuration: enterAnimation,
      width: '50%',
    });

  }
}
