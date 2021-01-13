import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup1: FormGroup;
  formGroup2: FormGroup;

  public registerMSG: string;

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

  public obj = {
    idNum: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    street: "",
    role: 0,
    session: (Math.random() + ' ').substring(2, 10) + (Math.random() + ' ').substring(2, 10)
  }

  verifiedPass: string;
  mailStatus: number;
  idNumStatus: number;
  idNumMsg: string;

  constructor(private _formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit() {
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      forthCtrl: ['', Validators.required],
    });
    this.formGroup2 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      forthCtrl: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.mailStatus === 1 && this.idNumStatus === 1 && this.verifiedPass === this.obj.password) {
      this.api.insertUser(this.obj);
      this.registerMSG = "ההרשמה הושלמה, הנך מועבר לעמוד הבית! "
      setInterval(function () { window.location.pathname = "/"; }, 2000);
    }

    else {
      this.registerMSG = "";
      // window.location.pathname = "/"
    }
  }

  async validateEmail(mail) {
    let mailCheck = this.api.validateEmail(mail);
    if (mailCheck === true) {
      let mailExist = await this.api.mailExist(mail);
      console.log(mailExist)
      if (mailExist['status']) {
        this.mailStatus = mailExist['status'];
      }
      else {
        this.mailStatus = 1;
      }
    }
  }

  async validateIdNum(idNum) {
    let idNumExist = await this.api.idNumExist(idNum);
    console.log(idNumExist);
    if (idNumExist['status']) {
      this.idNumStatus = idNumExist['status'];
    }
    else {
      this.idNumStatus = 1;
    }
  }
}


