import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/Models/product.model';


@Component({
  selector: 'app-side-window',
  templateUrl: './side-window.component.html',
  styleUrls: ['./side-window.component.scss']
})
export class SideWindowComponent implements OnInit {
  pathname;
  errMsg: string;

  public session;
  public LoggedUser;
  public existCart;
  public totalPrice: number;

  public user = {
    email: "",
    password: ""
  }

  public cartObj: any = {
    user_id: "",
    status: ""
  }

  public categoriesList;
  public categoriesObs;



  public cartProducts;

  constructor(public api: ApiService) {

    if (localStorage.getItem("LoggedUser")) {
      this.LoggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
      console.log("logged user:", this.LoggedUser)
    }

    this.categoriesObs = this.api.categories.subscribe(categoriesService => {
      // console.log("Categories Observable:", categoriesService)
      this.categoriesList = [...categoriesService];
    });

  }

  ngOnInit() {
    this.pathname = window.location.pathname;
    this.cartExist();
  }

  public ngOnDestroy() {
    this.categoriesObs.unsubscribe();
  }

  async LoginCheck() {
    let existUser = await this.api.userExist(this.user.email, this.user.password)
    if (existUser['data']) {
      console.log("USER EXIST", existUser['data']);
      this.LoggedUser = existUser['data'];
      localStorage.setItem("LoggedUser", JSON.stringify(this.LoggedUser));
      localStorage.setItem("userSession", JSON.stringify(this.LoggedUser.session));
      this.cartExist();
      window.location.reload();
    }
    else {
      this.errMsg = "סיסמה או אימייל לא נכונים, אנא נסה/י שנית";
    }
  }

  sessionCheck() {
    if (localStorage.getItem("userSession")) {
      this.session = JSON.parse(localStorage.getItem("userSession"));
      console.log("session:", this.session)
      if (this.LoggedUser.session !== "" && this.LoggedUser.session.length === 16) {
        if (!this.existCart && this.LoggedUser.role !== 1) {
          this.cartObj.status = 0;
          this.api.insertCart(this.cartObj)
        }
        window.location.pathname = "/products";
      }
    }
  }

  async cartExist() {
    if (this.LoggedUser) {
      this.cartObj.user_id = this.LoggedUser.id;
      this.existCart = await this.api.getCartByUserId(this.cartObj.user_id);
      this.existCart = this.existCart['data'];
      console.log("this.existCart:", this.existCart);
    }
  }


}


