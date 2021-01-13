import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  cities: City[] = [
    { value: 'Tel Aviv', viewValue: 'תל-אביב' },
    { value: 'Haifa', viewValue: 'חיפה' },
    { value: 'Jerusalem', viewValue: 'ירושלים' },
    { value: 'Qiryat Bialik', viewValue: 'קרית ביאליק' },
    { value: 'Qiryat Yam', viewValue: 'קרית ים' },
    { value: 'Qiryat Ata', viewValue: 'קרית אתא' },
    { value: 'Qiryat Haim', viewValue: 'קרית חיים' },
    { value: 'Naharyia', viewValue: 'נהריה' },
    { value: 'Rishon Lezion', viewValue: 'ראשון לציון' },
    { value: 'Petah Tikva', viewValue: 'פתח תקוה' },
    { value: 'Acre', viewValue: 'עכו' },
    { value: 'Ashdod', viewValue: 'אשדוד' },
    { value: 'Raanana', viewValue: 'רעננה' },
    { value: 'Kfar Sava', viewValue: 'כפר סבא' },
    { value: 'Natanya', viewValue: 'נתניה' },
  ];

  formGroup1: FormGroup;
  formGroup2: FormGroup;

  productsSearch;
  searchOption = "product_name";
  LoggedUser: any;
  cartProducts: any;

  public Basket;

  public obj = {
    user_id: "",
    cart_id: "",
    totalPrice: Number(""),
    toCity: "",
    toStreet: "",
    orderDate: "",
    card: "",
  }

  totalPrice: number;
  orderId: any;
  cardMsg;
  dateAlert: string;
  allFieldsReq: string = "חובה למלא את כל השדות!"
  dateIsFine: boolean;

  constructor(private _formBuilder: FormBuilder, public api: ApiService) {
    if (localStorage.getItem("LoggedUser")) {
      this.LoggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
      console.log("logged user:", this.LoggedUser)
    }

    this.getBasket();

  }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required]
    });
    this.formGroup2 = this._formBuilder.group({
      firstCtrl: ['', Validators.pattern(/^\d+$/)]
    });
  }

  async getBasket() {
    if (this.LoggedUser.role !== 1) {
      this.Basket = await this.api.getCartByUserId(this.LoggedUser.id)
      this.Basket = this.Basket.data;
      console.log("this.Basket:", this.Basket)
      this.cartProducts = this.Basket.cart_products;
    }
  }

  checkCard() {
    if (this.obj.card) {
      let isnum = /^\d+$/.test(this.obj.card);
      console.log(isnum);
      if (isnum == false) {
        this.cardMsg = "על מספר האשראי להכיל ספרות בלבד!"
      }
      else {
        this.cardMsg = "";
      }
    }
  }

  checkDate() {
    let givenDate = new Date(this.obj.orderDate);
    let currentDate = new Date();
    if (givenDate >= currentDate) {
      console.log("given date is greater or equal" + "/" + givenDate);
      this.dateAlert = "";
      this.dateIsFine = true;
    }
    else {
      this.dateAlert = "התאריך לא תקין, אנא מלאו תאריך עתידי."
      this.dateIsFine = false;
    }
  }

  async onSubmit() {
    this.obj.user_id = this.Basket.user_id;
    this.obj.cart_id = this.Basket.id;
    this.obj.totalPrice = this.totalPrice;
    console.log("new obj:", this.obj);

    let order = await this.api.insertOrder(this.obj);
    console.log(order['data'])
    console.log("new order id:", order['data']['id'])
    this.orderId = order['data']['id'];
    let update = this.api.updateCartStatus(this.obj.cart_id);
    this.api.getAllOrders();
  }


  getTotal() {
    let total = 0;
    if (this.cartProducts) {
      this.cartProducts.map(item => {
        total += Number(item.productTotal);
      })
      this.totalPrice = total;
      return total;
    }
  }


  download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  downloadOrderTxt() {
    const date = this.obj.orderDate.replace(/(\d{4})-(\d\d)-(\d\d)/, "$3-$2-$1");
    var text = '';
    text += `\r תודה שקנית אצלנו! \r`;
    text += `\r ההזמנה שלך תגיע בתאריך: ${date} \r`;
    for (let i = 0; i < this.cartProducts.length; i++) {
      console.log(this.cartProducts[i]);
      text += `\r ${this.cartProducts[i].product_name}  |  מחיר ליחידה: ${this.cartProducts[i].price}₪  |  כמות: ${this.cartProducts[i].quantity} \r`;
    }
    text += `\r סך הכל לתשלום: ${this.getTotal()}₪.\r`;
    text += `\r נתראה בהזמנה הבאה!\r`
    var filename = 'Order.pdf';
    this.download(filename, text);

  }
}

