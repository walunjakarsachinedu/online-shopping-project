import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { CustomerService } from '../common/services/customer.service';
import { MyValidators } from '../validators';

@Component({
  selector: 'app-login',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private customers: CustomerService, 
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService,
  ) { }

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
    this.authService.createUser({
      name: this.name?.value?.toLowerCase() ?? '',
      email: this.email?.value?.toLowerCase() ?? '',
      password: this.password?.value ?? '',
      address: this.address?.value ?? '',
    })
    .subscribe(isUserCreated => {
      if(!isUserCreated) {
        this.toastr.error("Sorry, an account with given email address already exists. Please try again.");      
        return this.form.setErrors({userAlreadyExists: true});
      }
      this.toastr.success("Success! You can now log in to your new account.");      
      this.router.navigate(['/signin']);
    });
  }
}
