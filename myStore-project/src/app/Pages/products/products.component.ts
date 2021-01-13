import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category.model';
import { ApiService } from 'src/app/services/api.service';
import { Product } from 'src/app/Models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { isNgTemplate } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsSearch;
  searchOption = "name";

  url = this.api.globalUrl;

  public LoggedUser;
  public Basket;
  public cartProducts;

  cartPrObj: any = {
    product_name: "",
    product_id: "",
    cart_id: "",
    quantity: "",
    price: "",
    productTotal: ""
  }
  formData: any = new FormData();

  name: string;
  cat_id;
  price: number;
  description: string = "";

  public categoriesArray: Category[];
  public categoriesObs;

  public productsArray: Product[];
  public productsObs;

  public selectedProduct: any;

  selectedCatId: string;

  filesToUpload: Array<File>;
  editedFilesToUpload: Array<File>;
  addMsg: string;

  constructor(public api: ApiService, public http: HttpClient) {
    if (localStorage.getItem("LoggedUser")) {
      this.LoggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
      console.log("logged user:", this.LoggedUser)
    }

    this.categoriesObs = this.api.categories.subscribe(categoriesService => {
      // console.log("categoriesArray Observable:", categoriesService)
      let test1 = [...categoriesService];
      for (let i = 0; i < test1.length; i++) {
        // console.log("products:", test1[i]['products']);
        if (test1[i]['products']) {
          for (let item of test1[i]['products']) {
            item.qnt = 1;
          }
        }
      }
      this.categoriesArray = test1;
      // console.log("categoriesArray Observable:", this.categoriesArray);
    });

    this.productsObs = this.api.products.subscribe(productsService => {
      // console.log("productsArray Observable:", productsService)
      this.productsArray = [...productsService];
    });

    this.getBasket();
  }

  ngOnInit(): void {

  }

  //  ******** START OF PRODUCTS FUNCTIONS ********** //
  async getProductById(id) {
    if (id) {
      let test = await this.api.getProductById(id);
      this.selectedProduct = test['data'];
      console.log("selected product:", this.selectedProduct[0]);
    }
  }

  addImage(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  async addNewProduct() {

    if (!this.name || !this.cat_id || !this.price || !this.filesToUpload) {
      alert("All fields are required")
    }
    else {
      this.formData = new FormData();
      this.formData.append('name', this.name);
      this.formData.append('cat_id', this.cat_id);
      this.formData.append('price', this.price);
      this.formData.append('description', this.description);

      for (let i = 0; i < this.filesToUpload.length; i++) {
        this.formData.append(
          'uploads[]',
          this.filesToUpload[i],
          this.filesToUpload[i]['name']
        );
      }
      console.log("formdata:" + this.formData)
      let result = await this.api.addNewProduct(this.formData);
      if (result['status'] === 1) {
        this.addMsg = "המוצר התווסף בהצלחה!"
        setTimeout(function () { document.getElementById('closeAddModal').click(); }, 1000);
        this.filesToUpload = [];
        this.name && this.cat_id && this.price && this.description == "";
        this.api.getAllProducts();
        this.api.getAllCategories();
      }
    }
  }

  updateImage(fileInput: any) {
    this.editedFilesToUpload = <Array<File>>fileInput.target.files;
  }

  async updateProduct() {
    console.log(this.selectedProduct[0])
    if (this.selectedCatId) {
      this.selectedProduct.cat_id = this.selectedCatId;
    }
    this.name = this.selectedProduct[0].name;
    this.cat_id = this.selectedProduct[0].cat_id;
    this.price = this.selectedProduct[0].price;
    this.description = this.selectedProduct[0].description;

    this.formData = new FormData();
    this.formData.append('id', this.selectedProduct[0].id);
    this.formData.append('name', this.name);
    this.formData.append('cat_id', this.cat_id);
    this.formData.append('price', this.price);
    this.formData.append('description', this.description);

    if (this.editedFilesToUpload) {
      for (let i = 0; i < this.editedFilesToUpload.length; i++) {
        this.formData.append(
          'uploads[]',
          this.editedFilesToUpload[i],
          this.editedFilesToUpload[i]['name']
        );
      }
    }


    let result = await this.api.updateProduct(this.formData);
    if (result['status'] === 1) {
      this.editedFilesToUpload = [];
      this.selectedProduct = "";
      this.name && this.cat_id && this.price && this.description == "";
      this.api.getAllProducts();
      this.api.getAllCategories();

    }

  }

  deleteProduct(p_id) {
    console.log("delete:", p_id)
    let removed = this.api.deleteProduct(p_id);
    this.selectedProduct = "";
    this.editedFilesToUpload = [];
    this.api.getAllProducts();
    this.api.getAllCategories();
    // this.getProductById(p_id);

  }


  //  ******** END OF PRODUCTS FUNCTIONS ********** //


  //  ******** START OF CART FUNCTIONS ********** //
  async getBasket() {
    if (this.LoggedUser.role !== 1) {
      this.Basket = await this.api.getCartByUserId(this.LoggedUser.id)
      this.Basket = this.Basket.data;
      console.log("this.Basket:", this.Basket)
      this.cartProducts = this.Basket.cart_products;
    }

  }

  async insertProductToCart(obj) {
    console.log("product obj:", obj);
    console.log("cart:", this.cartProducts);

    this.cartPrObj = {
      product_name: obj.name,
      product_id: obj.id,
      cart_id: this.Basket.id,
      quantity: obj.qnt,
      price: obj.price,
      productTotal: Number(obj.price * obj.qnt)
    }

    let insertedPr = await this.api.insertProductToCart(this.cartPrObj);
    // console.log("product added", insertedPr['data']);
    if (insertedPr) {
      this.getBasket();
    }
  }

  removeFromCart(id) {
    console.log(id)
    let removed = this.api.removeFromCart(id);
    this.getBasket();
  }

  plus(obj) {
    obj.qnt++;
  }
  minus(obj) {
    if (obj.qnt > 1)
      obj.qnt--;
  }

  getTotal() {
    let total = 0;
    if (this.cartProducts) {
      this.cartProducts.map(item => {
        total += Number(item.productTotal);
      })
      return total;
    }

  }
  //  ******** END OF CART FUNCTIONS ********** //

  public ngOnDestroy() {
    this.categoriesObs.unsubscribe();
    this.productsObs.unsubscribe();
    // this.selectedProductObs.unsubscribe();
  }

}
