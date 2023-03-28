import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { CustomerService } from './common/services/customer.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService } from './common/services/product.service';
import { SigninComponent } from './signin/signin.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthService } from './common/services/auth.service';
import { AuthGuard } from './common/services/auth-guard.service';
import { TestComponent } from './test/test.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminAuthGuard } from './common/services/admin-auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RedirectComponent } from './redirect/redirect.component';
import { DataService } from './common/services/data.service';

@NgModule({
  declarations: [
    InputErrorComponent,
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProductsComponent,
    ProductDetailComponent,
    TestComponent,
    NoAccessComponent,
    NotFoundComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: RedirectComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'products', component: ProductsComponent, canActivate: [AuthGuard]},
      {path: 'product-detail', component: ProductDetailComponent},
      {path: 'no-access', component: NoAccessComponent},
      {path: 'test', component: TestComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: '**', component: NotFoundComponent},
    ])
  ],
  providers: [CustomerService, ProductService, AuthService, AdminAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
