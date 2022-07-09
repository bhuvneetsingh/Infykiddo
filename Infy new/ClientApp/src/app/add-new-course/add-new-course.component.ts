/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */ 
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../Services/Course/course.service';

@Component({
  selector: 'app-add-new-course',
  templateUrl: './add-new-course.component.html',
  styleUrls: ['./add-new-course.component.css']
})
export class AddNewCourseComponent {
  status: any;
    showDiv: boolean | undefined;
    errorMsg: any;


  constructor(private httpclient: HttpClient, private _CourseService: CourseService, private router: Router) { }
  submitNewCourse(form: NgForm) {
    this._CourseService.validateCredentials(form.value.CourseName, form.value.MinAge, form.value.MaxAge, form.value.CourseDuration, form.value.Prereq, form.value.Description).subscribe(
      responseLoginStatus => {
      this.status = responseLoginStatus;
      this.showDiv = true;
      this.router.navigate(['/Trainer-page']);
    },
      responseLoginError => {
        this.errorMsg = responseLoginError;
      },
  )}
  

 
}
