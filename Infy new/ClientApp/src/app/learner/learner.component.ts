/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { ICourse } from '../Interfaces/Course';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.css']
})
export class LearnerComponent implements OnInit {
  Courses: ICourse[] = [];
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getCourses();
  }
  getCourses() {
    this._userService.learnerCourses().subscribe(
      responseProductData => {
        this.Courses = responseProductData;
      }
    );
  }
}
