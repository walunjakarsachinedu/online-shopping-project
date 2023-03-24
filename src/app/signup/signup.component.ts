import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../common/services/customer.service';
import { MyValidators } from '../validators';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class LoginComponent {
  constructor(private customers: CustomerService, private router: Router) { }

  public form = new FormGroup({
    name: new FormControl('', MyValidators.name_),
    password: new FormControl('', MyValidators.password),
    email: new FormControl('', MyValidators.email),
    address: new FormControl('', MyValidators.address),
  });

  get name() { return this.form.get("name") }

  get address() { return this.form.get("address") }
  
  get password() { return this.form.get("password") }

  get email() { return this.form.get("email") }

  onSubmit() {
    this.customers.getCustomerByEmail(this.email?.value ?? '').subscribe(cust => {
      if(cust.length != 0) return this.form.setErrors({existingUser: true, message: "Email already exists. Please log in or use a different email."});
      this.customers.post({
        name: this.name?.value?.toLowerCase(),
        email: this.email?.value?.toLowerCase(),
        password: this.password?.value,
        address: this.address?.value,
      }).subscribe(value => this.router.navigate(['/signin']));
    })
  }
}
