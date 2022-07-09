/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { IUser } from '../Interfaces/User';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Users: IUser[] = [];
  constructor(private _userservice: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this._userservice.getUsers().subscribe(
      responseProductData => {
        this.Users = responseProductData;
        console.log(this.Users)
      }
    );
  }
}
