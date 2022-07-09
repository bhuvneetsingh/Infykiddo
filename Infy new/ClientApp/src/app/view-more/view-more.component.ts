/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { ICourse } from '../Interfaces/Course';
import { CourseDetailService } from '../Services/Course-Detail/course-detail.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {
  Courses: ICourse[] = [];
  status: boolean = false;
  constructor(private _CourseDetailservice: CourseDetailService) { }

  ngOnInit(): void {
    this.getCourses();
  }
  getCourses() {
    this._CourseDetailservice.ViewCourses().subscribe(
      responseProductData => {
        this.Courses = responseProductData;
      }
    );
  }
  Enroll(Course: ICourse) {
    this._CourseDetailservice.Enroll(Course.courseId)
      .subscribe((responseRemoveCartProductStatus: boolean) => {
        this.status = responseRemoveCartProductStatus;
        if (this.status) {
          alert("Course Enrolled");
          this.ngOnInit();
        }
        else {
          alert("Can not enroll.");
        }
      })
  }
}
