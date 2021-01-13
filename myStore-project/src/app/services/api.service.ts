import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Models/user.model';
import { Category } from '../Models/category.model';
import { Product } from '../Models/product.model';
import { Cart } from '../Models/cart.model';
import { Order } from '../Models/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  globalUrl = 'http://localhost:5000/';
  // secondGlobalUrl = 'http://http://jdevelopments.co.il/mystore/';

  public users = new BehaviorSubject<User[]>([]);
  public categories = new BehaviorSubject<Category[]>([]);
  public products = new BehaviorSubject<Product[]>([]);
  public carts = new BehaviorSubject<Cart[]>([]);
  public orders = new BehaviorSubject<Order[]>([]);
  public selectedProduct = new BehaviorSubject<Product[]>([]);
  public selectedCart = new BehaviorSubject<Cart[]>([]);
  // public cartProducts = new BehaviorSubject([]);
  public downloadFile = new BehaviorSubject([]);

  constructor(public http: HttpClient) {
    this.getUsers();
    this.getAllProducts();
    this.getAllCategories();
    this.getAllOrders();
    // this.getCartProducts();
  }

  // ********** Start of Users functions *********** //

  getUsers(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<User[]>(`${this.globalUrl}users/getUsers`).subscribe(data => {
          if (data['status'] == 1)
            this.users.next(data['data']);
          // resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  insertUser(obj): Promise<User> {
    console.log("service User obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<User>(`${this.globalUrl}users/insertUser`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("User is Inserted")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  userExist(email, password): Promise<User> {
    console.log("email and password:", email, "|", password)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<User>(`${this.globalUrl}users/userExist?email=${email}&password=${password}`).subscribe(data => {
          if (data['status'] == 1)
            // this.user.next(data['data']);
            resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  mailExist(email): Promise<User> {
    console.log("email:", email)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<User>(`${this.globalUrl}users/mailExist?email=${email}`).subscribe(data => {
          if (data['status'] == 2) {
            // this.user.next(data['data']);
            resolve(data);
          }
          else
            resolve(email)
        });
      } catch (err) {
        console.log("err");
      }
    });
  }

  idNumExist(idNum): Promise<User> {
    console.log("idNum:", idNum)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<User>(`${this.globalUrl}users/idNumExist?idNum=${idNum}`).subscribe(data => {
          if (data['status'] == 3) {
            // this.user.next(data['data']);
            resolve(data);
          }
          else
            resolve(idNum)
        });
      } catch (err) {
        console.log("err");
      }
    });
  }

  validateEmail = (mail) => { // רגקס לבדיקת תקינות מייל
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  }

  //********** END of Users functions **********//


  // ********** Start of CATEGORIES functions *********** //
  getAllCategories(): Promise<Category[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Category[]>(`${this.globalUrl}categories/getAllCategories`).subscribe(data => {
          if (data['status'] == 1)
            this.categories.next(data['data']);
          // resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  insertCategory(obj): Promise<Category> {
    console.log("service Category obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<Category>(`${this.globalUrl}categories/insertCategory`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("Category Inserted")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  //********** END of CATEGORIES functions **********//


  // ********** Start of PRODUCTS functions *********** //
  getAllProducts(): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Product[]>(`${this.globalUrl}products/getAllProducts`).subscribe(data => {
          if (data['status'] == 1) {
            for (let i = 0; i < data['data'].length; i++) {
              data['data'][i]['qnt'] = 1;
            }
            this.products.next(data['data']);
          }
          // resolve(data);
        });

      } catch (err) {
        console.log(err);
      }
    });
  }

  getProductsByCatId(catId): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Product[]>(`${this.globalUrl}products/getProductsByCatId?cat_id=${catId}`).subscribe(data => {
          if (data['status'] == 1)
            this.products.next(data['data']);
          // resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getProductById(id): Promise<Product[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Product[]>(`${this.globalUrl}products/getProductById?id=${id}`).subscribe(data => {
          if (data['status'] == 1)
            // this.selectedProduct.next(data['data']);
            resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  updateProduct(obj): Promise<Product> {
    console.log("product to update obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<Product>(`${this.globalUrl}products/updateProduct`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("Product Updated")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }


  addNewProduct(obj): Promise<Product> {
    console.log("added product obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<Product>(`${this.globalUrl}products/addNewProduct`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("Product Added")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  deleteProduct(p_id) {
    console.log("delete product:", p_id)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get(`${this.globalUrl}products/deleteProduct?id=${p_id}`).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("product deleted")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  //********** END of PRODUCTS functions **********//


  // ********** Start of CARTS functions *********** //

  getAllCarts(): Promise<Cart[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Cart[]>(`${this.globalUrl}cart/getAllCarts`).subscribe(data => {
          if (data['status'] == 1)
            this.carts.next(data['data']);
          // resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  insertCart(obj): Promise<Cart> {
    console.log("service Cart obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<Cart>(`${this.globalUrl}cart/insertCart`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("Cart Inserted")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getCartByUserId(id): Promise<Cart[]> {
    // console.log(id)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Cart[]>(`${this.globalUrl}cart/getCartByUserId?user_id=${id}`).subscribe(data => {
          if (data['status'] == 1) {
            this.selectedCart.next(data['data']);
            resolve(data);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  getCartByUserIdStatus(id, status): Promise<Cart[]> {
    console.log(id, status)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Cart[]>(`${this.globalUrl}cart/getCartByUserIdStatus?user_id=${id}&status=${status}`).subscribe(data => {
          if (data['status'] == 1) {
            // this.selectedProduct.next(data['data']);
            resolve(data);
            console.log(data)
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }


  removeFromCart(id) {
    console.log("remove from cart product id:", id)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get(`${this.globalUrl}cart/removeFromCart?id=${id}`).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("product removed")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  insertProductToCart(obj) {
    console.log("cart product obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<Cart>(`${this.globalUrl}cart/insertProductToCart`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("product Inserted to the cart")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  updateCartStatus(cart_id) {
    console.log("cart_id:", cart_id)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get(`${this.globalUrl}cart/updateCartStatus?id=${cart_id}`).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("cart status updated")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  //********** END of CARTS functions **********//

  getAllOrders(): Promise<Order[]> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.get<Order[]>(`${this.globalUrl}orders/getAllOrders`).subscribe(data => {
          if (data['status'] == 1)
            this.orders.next(data['data']);
          // resolve(data);
        });
      } catch (err) {
        console.log(err);
      }
    });
  }

  insertOrder(obj): Promise<Order> {
    console.log("order obj:", obj)
    return new Promise(async (resolve, reject) => {
      try {
        await this.http.post<Order>(`${this.globalUrl}orders/insertOrder`, obj).subscribe(data => {
          if (data['status'] == 1) {
            // this.user.next(data['data']);
            resolve(data);
            console.log("order created")
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }



}
