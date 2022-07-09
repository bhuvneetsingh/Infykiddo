/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from '../Interfaces/Course';
import { UserService } from '../Services/User/user.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor(private _userService: UserService, private router: Router) { }
  Courses: ICourse[] = [];
  status: string | undefined;
  errorMsg: string | undefined;
  msg: string | undefined;
  x: string | undefined;
  y: string | undefined;
  showDiv: boolean = false;
  ngOnInit(): void {
    this.getCourses();
  }
  imgCollection: Array<object> = [
    {
      image: 'https://loremflickr.com/g/600/400/paris',
      thumbImage: 'https://loremflickr.com/g/1200/800/paris',
      alt: 'Image 1',
      title: 'Image 1'
    }, {
      image: 'https://loremflickr.com/600/400/brazil,rio',
      thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
      title: 'Image 2',
      alt: 'Image 2'
    }, {
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
      title: 'Image 3',
      alt: 'Image 3'
    }, {
      image: 'https://loremflickr.com/600/400/brazil,rio',
      thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
      title: 'Image 4',
      alt: 'Image 4'
    },{
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: 'https://loremflickr.com/1200/800/paris,girl/all',
      title: 'Image 5',
      alt: 'Image 5'
    }, {
      image: 'https://loremflickr.com/600/400/brazil,rio',
      thumbImage: 'https://i.picsum.photos/id/609/400/350.jpg',
      title: 'Image 6',
      alt: 'Image 6'
    }
  ];
  getCourses() {
    this._userService.getCourses().subscribe(
      responseProductData => {
        this.Courses = responseProductData;
      }
    );
  }
  view(Course: ICourse) {
    this._userService.view(Course.courseId).subscribe(
      responseLoginStatus => {
        this.status = responseLoginStatus;
        this.showDiv = true;
        if (this.status == "Valid Credentials") {
          this.router.navigate(['/ViewMore']);
        }
        else {
          this.msg = this.status + ". Try again with valid credentials.";
        }
      },
    );
  }
}
