import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { CustomerService } from '../common/services/customer.service';
import { MyValidators } from '../validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private customers: CustomerService, private router: Router, private authService: AuthService) { }

  public form = new FormGroup({
    email: new FormControl('', MyValidators.email),
    password: new FormControl('', MyValidators.password),
  });

  get password() { return this.form.get("password") }

  get email() { return this.form.get("email") }

  signin() {
    this.customers.getCustomerByEmail(this.email?.value ?? '')
      .subscribe(customer => {
        if(customer.length == 0 || customer[0].password != this.password?.value) 
          this.form.setErrors({auth: true});
        else {
          this.authService.login(this.form.value);
        }
      });
  }

}
