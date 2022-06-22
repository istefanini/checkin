import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private msalService: MsalService) { }

  getname(): any {
    return this.msalService.instance.getActiveAccount()?.name;
  }

  isLoggedIn(): boolean{
    return this.msalService.instance.getActiveAccount() != null
  }

  logout(){
    this.msalService.logoutRedirect();
  }

  ngOnInit(): void {
    this.msalService.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalService.instance.setActiveAccount(res.account)
        }
      }
    )
  }

}
