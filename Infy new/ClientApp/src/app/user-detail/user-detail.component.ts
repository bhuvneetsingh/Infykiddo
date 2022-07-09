/* References https://infyspringboard.onwingspan.com/web/en/app/toc/lex_31364648044580110000/overview */
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../Interfaces/product';
import { UserDetailService } from 'src/app/Services/User-Detail/user-detail.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  products: IProduct[] = [];
  showMsgDiv: boolean = false;

  constructor(private _UserDetailservice: UserDetailService  ) { }

  ngOnInit(): void {
    this.getProducts();
    if (this.products == null) {
      this.showMsgDiv = true;
    }
  }
  getProducts() {
    this._UserDetailservice.getProducts().subscribe(
      responseProductData => {
        this.products = responseProductData;
        this.showMsgDiv = false;
      }
    );
  }

}
