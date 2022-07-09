/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../Services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  status: string | undefined;
  errorMsg: string | undefined;
  msg: string | undefined;
  showDiv: boolean = false;

  constructor(private _userService: UserService, private router: Router) { }
  submitLoginForm(form: NgForm) {
    this._userService.validateCredentials(form.value.email, form.value.ParentName, form.value.LearnerName, form.value.LearnerAge, form.value.password).subscribe(
      responseLoginStatus => {
        this.status = responseLoginStatus;
        this.showDiv = true;
        this.router.navigate(['/after-register']);
      },
      responseLoginError => {
        this.errorMsg = responseLoginError;
      },
      () => console.log("SubmitLoginForm method executed successfully")
    );
  }

  ngOnInit() {
  }
}
