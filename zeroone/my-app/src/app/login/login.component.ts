import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})

export class LoginComponent implements OnInit {
  title = 'Login';
  constructor(@Inject('auth') private service) {
  }
  ngOnInit() {
  }
  onSubmit(formValue) {
    console.log('form value : ' + this.service.loginWithCredentials(formValue.login.username, formValue.login.password));
  }

}
