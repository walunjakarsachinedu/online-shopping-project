import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../common/services/auth.service';
import { CustomerService } from '../common/services/customer.service';
import { MyValidators } from '../validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private customers: CustomerService, 
    private router: Router, 
    private authService: AuthService, 
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  public form = new FormGroup({
    email: new FormControl('', MyValidators.email),
    password: new FormControl('', MyValidators.password),
  });

  get password() { return this.form.get("password") }

  get email() { return this.form.get("email") }

  signin() {
    this.authService.login(this.form.value).subscribe(islogin => {
      if(!islogin) {
        this.toastr.error("Oops! The email or password you entered is incorrect. Please try again.");
        return this.form.setErrors({auth: true});
      }
      let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl');
      let homePage = "/";
      if(this.authService.currentUser.role == "admin") homePage = "/admin-home";
      this.router.navigate([returnUrl || homePage]);
    });
  }

}
 