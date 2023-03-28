import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private customers: CustomerService, private router: Router, private authService: AuthService) { }

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
    .pipe(catchError(error => of(this.form.setErrors({userAlreadyExists: true}))))
    .subscribe(value => this.router.navigate(['/signin']));
  }
}
