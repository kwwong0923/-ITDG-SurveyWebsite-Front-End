import { Component, OnChanges, OnInit, AfterViewInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  // user: User = localStorage.getItem['userInfo'];
  logged: Boolean = false;
  constructor
  (
    private authService: AuthService,
    private router: Router
  ) 
  {
    this.logged = this.authService.isAuthenticated()
   }

  ngOnInit(): void 
  {
    this.logged = this.authService.isAuthenticated()
    // console.log(`this.logged : ${this.logged}`)
  }

  ngOnChanges()
  {
    this.logged = this.authService.isAuthenticated()
  }

  ngAfterViewInit()
  {
    this.logged = this.authService.isAuthenticated()
  }
  logout()
  {
    this.authService.clearStorage()
    this.authService.logoutUser()
    this.router.navigate([''])
    this.logged = this.authService.isAuthenticated();
    console.log(this.logged);
  }
}
