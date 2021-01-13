import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/Models/product.model';
import { User } from 'src/app/Models/user.model';
import { Order } from 'src/app/Models/order.model';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public productsQntArray: Product[];
  public productsQntObs;

  public usersQntArray: User[];
  public usersQntObs;

  public ordersQntArray: Order[];
  public ordersQntObs;

  constructor(public api: ApiService) {

    // PRODUCTS
    this.productsQntObs = this.api.products.subscribe(productsQntService => {
      // console.log("ProductsQNT Observable:", productsQntService)
      this.productsQntArray = [...productsQntService];
    });

    // USERS
    this.usersQntObs = this.api.users.subscribe(usersQntService => {
      // console.log("usersQntObs Observable:", usersQntService)
      this.usersQntArray = [...usersQntService];
    });

    // ORDERS
    this.ordersQntObs = this.api.orders.subscribe(ordersQntService => {
      // console.log("ordersQntService Observable:", ordersQntService)
      this.ordersQntArray = [...ordersQntService];
    });
  }

  public ngOnDestroy() {
    this.productsQntObs.unsubscribe();
    this.usersQntObs.unsubscribe();
    this.ordersQntObs.unsubscribe();
  }

  ngOnInit(): void {
  }

}
