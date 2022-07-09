/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'Feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {


  submitNewCourse(form: NgForm) {
    console.log(form.value.Rate);
  }

}
