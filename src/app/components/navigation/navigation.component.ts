import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (!this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {

  }

  public onLoginButton(): void {
    this.router.navigateByUrl('/login');
  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigateByUrl('/login');
  }
}
