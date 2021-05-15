import { OktaAuthService } from '@okta/okta-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  constructor(private oktaAuthService: OktaAuthService) { }

  ngOnInit() {

    this.oktaAuthService.$authenticationState.subscribe(
      result => {
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    )
  }

  getUserDetails() {
    if(this.isAuthenticated){
       // fetch the logged in user details in (users's claims)
       //
       // user full name is exposed in as a property name
       this.oktaAuthService.getUser().then(
         (res) => {
           this.userFullName = res.name;
         }
       )
    }
  }

  logout(){
    // terminates the session with okta and removes the current tokens.
    this.oktaAuthService.signOut();
  }

}
