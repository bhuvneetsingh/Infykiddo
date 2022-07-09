/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../Services/Login/login.service';
import { Router } from '@angular/router';
import { TLoginService } from '../Services/TLogin/tlogin.service';
import { SLoginService } from '../Services/SLogin/slogin.service';
@Component({
  selector: 'fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  status: string | undefined;
  errorMsg: string | undefined;
  msg: string | undefined;
  x: string | undefined;
  y: string | undefined;
  showDiv: boolean = false;
  constructor(private _LoginService: LoginService, private router: Router, private _TLoginService: TLoginService, private _SLoginService: SLoginService) { }
  submitLoginForm(form: NgForm) {
    this.x = form.value.id.slice(0, 1);
    if (this.x == "P") {
      var y = form.value.id.slice(1);
      this._LoginService.validateCredentials(y, form.value.password).subscribe(
        responseLoginStatus => {
          this.status = responseLoginStatus;
          this.showDiv = true;
          if (this.status == "Valid Credentials") {
            this.router.navigate(['/Parent']);
          }
          else {
            this.msg = this.status + ". Try again with valid credentials.";
          }
        },

        responseLoginError => {
          this.errorMsg = responseLoginError;
        },
        () => console.log("SubmitLoginForm method executed successfully")
      );
    }
    else if (this.x == "T") {
      var y = form.value.id.slice(1);
      this._TLoginService.validateCredentials(y, form.value.password).subscribe(
        responseLoginStatus => {
          this.status = responseLoginStatus;
          this.showDiv = true;
          if (this.status == "Valid Credentials") {
            this.router.navigate(['/Trainer-page']);
          }
          else {
            this.msg = this.status + ". Try again with valid credentials.";
          }
        },

        responseLoginError => {
          this.errorMsg = responseLoginError;
        },
        () => console.log("SubmitLoginForm method executed successfully")
      );
    }
    else if (this.x == "L") {
      var y = form.value.id.slice(1);
      this._SLoginService.validateCredentials(y, form.value.password).subscribe(
        responseLoginStatus => {
          this.status = responseLoginStatus;
          this.showDiv = true;
          if (this.status == "Valid Credentials") {
            this.router.navigate(['/Learner']);
          }
          else {
            this.msg = this.status + ". Try again with valid credentials.";
          }
        },

        responseLoginError => {
          this.errorMsg = responseLoginError;
        },
        () => console.log("SubmitLoginForm method executed successfully")
      );
    }
    if (form.value.id == "Admin" && form.value.password == "Administrator") {
      this.router.navigate(['/admin']);
      
    }
  }
  ngOnInit() {
  }
}
