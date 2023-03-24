import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent as SignupComponent } from './signup/signup.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { CustomerService } from './common/services/customer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './common/services/product.service';
import { SigninComponent } from './signin/signin.component';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    InputErrorComponent,
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: SignupComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'products', component: ProductsComponent},
    ])
  ],
  providers: [CustomerService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
