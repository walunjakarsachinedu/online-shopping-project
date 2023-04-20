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
import { AdminComponent } from './admin/admin.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component'; 
import { ShoppingCartService } from './common/services/shopping-cart.service';
import { CheckoutItemsComponent } from './checkout-items/checkout-items.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

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
    AdminComponent,
    ManageProductComponent,
    EditProductComponent,
    ProductPreviewComponent,
    ShoppingCartComponent,
    CheckoutItemsComponent,
    OrderHistoryComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
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
      {path: 'admin-home', component: AdminComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'manage/products', component: ManageProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'edit/product/:id', component: EditProductComponent, canActivate: [AuthGuard, AdminAuthGuard]},
      {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
      {path: 'checkout-items', component: CheckoutItemsComponent, canActivate: [AuthGuard]},

      {path: '**', component: NotFoundComponent},
    ])
  ],
  providers: [CustomerService, ProductService, AuthService, AdminAuthGuard, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
