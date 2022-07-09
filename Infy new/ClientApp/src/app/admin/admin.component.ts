/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { ICourse } from '../Interfaces/Course';
import { CourseDetailService } from '../Services/Course-Detail/course-detail.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Courses: ICourse[] = [];
  showMsgDiv: boolean = false;
  status: boolean = false;
  constructor(private _CourseDetailservice: CourseDetailService) { }

  ngOnInit(): void {
    this.getCourses();

    if (this.Courses == null) {
      this.showMsgDiv = true;
    }
 }
  getCourses() {
    this._CourseDetailservice.getCourses().subscribe(
      responseProductData => {
        this.Courses = responseProductData;
      }
    );
  }
  Delete(Course: ICourse) {
    this._CourseDetailservice.Delete(Course.courseId)
      .subscribe((responseRemoveCartProductStatus: boolean) => {
        this.status = responseRemoveCartProductStatus;
        if (this.status) {
          alert("Course deleted successfully.");
          this.ngOnInit();
        }
        else {
          alert("Product could not be deleted. Please try after sometime.");
        }
      })
  }
  Update(Course: ICourse) {
    this._CourseDetailservice.Update(Course.courseId)
      .subscribe((responseRemoveCartProductStatus: boolean) => {
        this.status = responseRemoveCartProductStatus;
        if (this.status) {
          alert("Course Approved");
          this.ngOnInit();
        }
        else {
          alert("Product could not be deleted. Please try after sometime.");
        }
      })
  }
}
