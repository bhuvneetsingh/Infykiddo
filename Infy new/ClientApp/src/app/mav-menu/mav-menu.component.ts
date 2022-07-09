/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component } from '@angular/core';

@Component({
  selector: 'app-mav-menu',
  templateUrl: './mav-menu.component.html',
  styleUrls: ['./mav-menu.component.css']
})
export class MavMenuComponent {

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
