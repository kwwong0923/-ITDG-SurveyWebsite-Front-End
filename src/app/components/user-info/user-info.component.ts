import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor() { }

  user!: User;
  userInfo!: String;
  ngOnInit(): void {

  }

}
