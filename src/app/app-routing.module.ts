import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserTableComponent } from './components/user/user-table/user-table.component';
import { RouteListComponent } from './components/route/route-list/route-list.component';
import { UserDetailsComponent } from './components/user/user-table/user-details/user-details.component';
import { UserEditFormComponent } from './components/user/user-table/user-details/user-edit-form/user-edit-form.component';
import { NewUserFormComponent } from './components/user/user-table/new-user-form/new-user-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'navigation', component: NavigationComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-table', component: UserTableComponent },
  { path: 'user/:username', component: UserDetailsComponent },
  { path: 'user/edit', component: UserEditFormComponent },
  { path: 'user/add', component: NewUserFormComponent },
  { path: 'route-list', component: RouteListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
