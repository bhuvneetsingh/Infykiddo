/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainerService } from '../Services/Trainer/trainer.service';
import { Router } from '@angular/router';
@Component({
  selector: 'trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {
  status: string | undefined;
  errorMsg: string | undefined;
  msg: string | undefined;
  showDiv: boolean = false;

  constructor(private _trainerService: TrainerService, private router: Router) { }
  submitLoginForm(form: NgForm) {
    this._trainerService.validateCredentials(form.value.email, form.value.FullName, form.value.ContactNumber, form.value.password).subscribe(
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
