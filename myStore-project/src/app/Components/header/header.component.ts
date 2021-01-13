import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public LoggedUser;

  constructor() {
    if (localStorage.getItem("LoggedUser"))
      this.LoggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  }

  signOut() {
    localStorage.removeItem("LoggedUser");
    localStorage.removeItem("userSession");
    if (window.location.pathname === "/")
      window.location.reload();
    else {
      window.location.pathname = "/"
    }
  }
  ngOnInit(): void {
  }

}
