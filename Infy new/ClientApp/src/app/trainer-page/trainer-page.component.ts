/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from '../Interfaces/Course';
import { TrainerService } from '../Services/Trainer/trainer.service';

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit {
  Courses: ICourse[] = [];

  constructor(private _trainerService: TrainerService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }
  getCourses() {
    this._trainerService.getCourses().subscribe(
      responseProductData => {
        this.Courses = responseProductData;
        console.log(this.Courses)
      }
    );
  }
}
