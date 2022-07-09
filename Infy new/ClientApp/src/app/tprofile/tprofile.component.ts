/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { ITrainer } from '../Interfaces/Trainer';
import { TrainerService } from '../Services/Trainer/trainer.service';

@Component({
  selector: 'app-tprofile',
  templateUrl: './tprofile.component.html',
  styleUrls: ['./tprofile.component.css']
})
export class TprofileComponent implements OnInit {
  Trainers: ITrainer[] = [];
  constructor(private _trainerservice: TrainerService) { }

  ngOnInit(): void {
    this.getTrainer();
  }
  getTrainer() {
    this._trainerservice.getTrainer().subscribe(
      responseProductData => {
        this.Trainers = responseProductData;
        console.log(this.Trainers)
      }
    );
  }
}
